// contexts/BleContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import bleManagerService from "../services/bleManager";

const BleContext = createContext();

export const BleProvider = ({ children }) => {
  const [isBleEnabled, setIsBleEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [currentAttendanceCode, setCurrentAttendanceCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check BLE state when component mounts
    checkBleStatus();

    return () => {
      // Clean up BLE resources when component unmounts
      bleManagerService.cleanup();
    };
  }, []);

  const checkBleStatus = async () => {
    try {
      const hasPermissions = await bleManagerService.requestPermissions();
      setIsBleEnabled(hasPermissions);
    } catch (err) {
      setError(`BLE error: ${err.message}`);
      setIsBleEnabled(false);
    }
  };

  // Student mode functions
  const startScan = async () => {
    try {
      setError(null);
      setScannedDevices([]);
      setIsScanning(true);

      await bleManagerService.startScan((device) => {
        // Only add new devices
        setScannedDevices((prevDevices) => {
          if (!prevDevices.some((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      });
    } catch (err) {
      setError(`Scan error: ${err.message}`);
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    bleManagerService.stopScan();
    setIsScanning(false);
  };

  // Teacher mode functions
  const startBroadcast = async (attendanceCode) => {
    try {
      setError(null);
      const result = await bleManagerService.startBroadcast(attendanceCode);
      setIsBroadcasting(result);
      if (result) {
        setCurrentAttendanceCode(attendanceCode);
      }
      return result;
    } catch (err) {
      setError(`Broadcast error: ${err.message}`);
      setIsBroadcasting(false);
      return false;
    }
  };

  const stopBroadcast = () => {
    const result = bleManagerService.stopBroadcast();
    setIsBroadcasting(!result);
    setCurrentAttendanceCode(null);
    return result;
  };

  // Connect to a device and read its attendance code
  const connectToDevice = async (device) => {
    try {
      const connectedDevice = await device.connect();
      const discoveredDevice =
        await connectedDevice.discoverAllServicesAndCharacteristics();

      const services = await discoveredDevice.services();
      for (const service of services) {
        if (service.uuid === bleManagerService.serviceUUID) {
          const characteristics = await service.characteristics();
          for (const characteristic of characteristics) {
            if (characteristic.uuid === bleManagerService.characteristicUUID) {
              const value = await characteristic.read();
              const decodedValue = bleManagerService.decodeAttendanceCode(
                value.value
              );
              await connectedDevice.cancelConnection();
              return decodedValue;
            }
          }
        }
      }

      await connectedDevice.cancelConnection();
      throw new Error("Attendance code not found");
    } catch (err) {
      throw new Error(`Connection error: ${err.message}`);
    }
  };

  const value = {
    isBleEnabled,
    isScanning,
    isBroadcasting,
    scannedDevices,
    currentAttendanceCode,
    error,
    checkBleStatus,
    startScan,
    stopScan,
    startBroadcast,
    stopBroadcast,
    connectToDevice,
  };

  return <BleContext.Provider value={value}>{children}</BleContext.Provider>;
};

export const useBle = () => useContext(BleContext);
