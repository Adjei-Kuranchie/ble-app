// services/bleManager.js
import * as Device from "expo-device";
import * as Location from "expo-location";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

class BLEManagerService {
  constructor() {
    this.bleManager = new BleManager();
    this.isScanning = false;
    this.peripheralId = null;
    this.serviceUUID = "1234"; // Custom UUID for our service
    this.characteristicUUID = "5678"; // Custom UUID for our characteristic
  }

  async requestPermissions() {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      const bluetoothPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires location permission",
          buttonPositive: "Allow",
        }
      );

      // On Android 12+, we need to request Bluetooth permissions
      if (Platform.Version >= 31) {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      }

      // Location permission is also required for BLE
      await Location.requestForegroundPermissionsAsync();

      return bluetoothPermission === PermissionsAndroid.RESULTS.GRANTED;
    }

    // For iOS
    if (Platform.OS === "ios") {
      const status = await this.bleManager.state();
      return status === "PoweredOn";
    }

    return false;
  }

  // Student mode: scan for attendance code broadcasts
  startScan(onDeviceFound) {
    return new Promise(async (resolve, reject) => {
      try {
        const hasPermission = await this.requestPermissions();
        if (!hasPermission) {
          reject("No permissions granted");
          return;
        }

        if (this.isScanning) {
          reject("Already scanning");
          return;
        }

        this.isScanning = true;

        // Listen for state changes
        this.stateSubscription = this.bleManager.onStateChange((state) => {
          if (state === "PoweredOn") {
            this.bleManager.startDeviceScan(
              [this.serviceUUID],
              null,
              (error, device) => {
                if (error) {
                  console.error("Scan error:", error);
                  this.stopScan();
                  reject(error);
                  return;
                }

                if (device) {
                  onDeviceFound(device);
                }
              }
            );
            resolve("Scanning started");
            this.stateSubscription.remove();
          }
        }, true);
      } catch (error) {
        this.isScanning = false;
        reject(error);
      }
    });
  }

  stopScan() {
    if (this.isScanning) {
      this.bleManager.stopDeviceScan();
      this.isScanning = false;
      return true;
    }
    return false;
  }

  // Teacher mode: start broadcasting attendance code
  async startBroadcast(attendanceCode) {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error("No permissions granted");
      }

      // Check if device supports peripheral mode
      const isPeripheralSupported = await this.isPeripheralSupported();
      if (!isPeripheralSupported) {
        throw new Error("Peripheral mode not supported on this device");
      }

      // Set up peripheral with the attendance code
      await this.bleManager.startAdvertising({
        serviceUUIDs: [this.serviceUUID],
        localName: `AttendanceApp-${attendanceCode}`,
      });

      this.peripheralId = await this.bleManager.addService({
        uuid: this.serviceUUID,
        characteristics: [
          {
            uuid: this.characteristicUUID,
            value: this.encodeAttendanceCode(attendanceCode),
            permissions: {
              readable: true,
              writeable: false,
            },
          },
        ],
      });

      return true;
    } catch (error) {
      console.error("Error starting broadcast:", error);
      return false;
    }
  }

  stopBroadcast() {
    if (this.peripheralId) {
      this.bleManager.stopAdvertising();
      this.peripheralId = null;
      return true;
    }
    return false;
  }

  async isPeripheralSupported() {
    // iOS typically doesn't support peripheral mode in background
    // and many Android devices don't support it at all
    if (Platform.OS === "ios") {
      return (
        Device.modelName.includes("iPhone") && parseInt(Device.osVersion) >= 13
      );
    }
    // For Android, we'd need to check at runtime
    return (await this.bleManager.state()) === "PoweredOn";
  }

  encodeAttendanceCode(code) {
    // Convert string code to Base64 for BLE transmission
    return Buffer.from(code).toString("base64");
  }

  decodeAttendanceCode(encodedCode) {
    // Convert Base64 back to string
    return Buffer.from(encodedCode, "base64").toString();
  }

  cleanup() {
    if (this.stateSubscription) {
      this.stateSubscription.remove();
    }
    this.stopScan();
    this.stopBroadcast();
    this.bleManager.destroy();
  }
}

// Create a singleton instance
const bleManagerService = new BLEManagerService();
export default bleManagerService;
