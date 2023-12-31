import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import BluetoothRoundedIcon from '@mui/icons-material/BluetoothRounded';

function AddHub_Bluetooth({onBluetooth, onGattServer}) {
  const [characteristicValue] = useState('');
  const [characteristic, setCharacteristic] = useState(null);
  const [isConnected, setIsConnected] = useState(false) // 블루투스 연결 여부
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
  }, [characteristic, characteristicValue])

  useEffect(() => {
    onBluetooth(characteristic, characteristicValue)
    console.log(characteristic)
  }, [characteristic, characteristicValue])

  const handleConnect = (event) => {
    event.stopPropagation()
    if ('bluetooth' in navigator) {
      // Web Bluetooth API 지원하는 경우, 스캔 및 연결 코드 작성
      navigator.bluetooth.requestDevice({
        filters: [{ name: 'NoMatter' }],
        optionalServices: ['00000001-1d10-4282-b68c-e17c508b94f4']
      })
      .then((device) => {
        setIsConnecting(true)
        console.log('BLE device:', device);
        return device.gatt.connect(
          {security: 'encrypt'}
        );
      })
      .then((server) => {
        // setGattServer(server)
        onGattServer(server)
        return server.getPrimaryService('00000001-1d10-4282-b68c-e17c508b94f4');
      })
      .then((service) => {
        return service.getCharacteristic('00000002-1d10-4282-b68c-e17c508b94f4');
      })
      .then((characteristic) => {
        setCharacteristic(characteristic);
        
        console.log('Chr: ', characteristic)
        console.log(characteristic.properties.read)
        alert('블루투스 연결 성공')
        setIsConnected(true);
        setIsConnecting(false);         
      })
      .catch((error) => {
        console.error('Error accessing BLE device:', error);
        alert('블루투스 연결 실패')
        setIsConnecting(false);  
      });
    } else {
      console.log('Web Bluetooth API is not supported in this browser.');
    }
  };

  const renderBluetooth = () => {
    if (isConnected) {
      return (
        <div className='centered flex-column' style={{ height: "40vh", position: "relative" }}>
          <div className='centered flex-column' style={{ position: "relative", zIndex: 1 }}>
            <div className='mb-3'>
              <img src="/images/bluetooth.png" alt="bluetooth" style={{ width: '100px', height: '100px' }} />
            </div>
            <h1 className='font-700'>연결 완료</h1>
          </div>
          <div
            className='centered flex-column'
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#d1e9f9',
              filter: "blur(18px)",
              padding: "50px",
              borderRadius: "50%",
              zIndex: 0
            }}
          ></div>
        </div>
      )
    }
    if (isConnecting) {
      return (
        <div style={{height:"50vh"}} className='centered'>
          <div className='d-flex justify-content-center align-content-center justify-items-between' style={{ marginLeft: "20px" }}>
            <div style={{ margin: "15px" }}><i className="bi bi-disc-fill" style={{ fontSize: '80px' }}></i></div>
            <div className='d-flex flex-column centered' style={{ margin: "18px" }}>
              <img src="/images/bluetooth.png" alt="bluetooth" style={{ width: '30px', height: '30px'}} />
              <img src="/images/connect.gif" alt="connect gif" style={{ width: "60px" }} ></img>
              <p className='text-primary font-700' style={{fontSize:"20px"}}>연결 중</p>
            </div>
            <div style={{ margin: "15px 15px 15px 5px" }}><i className="bi bi-phone" style={{ fontSize: '90px' }}></i></div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='flex-column d-flex mb-3'>
          <span style={{ fontSize: "16px", fontWeight: "500" }} className='mb-1'>1. 허브의 버튼을 눌러 <span className='text-primary'>파란 불</span>이 점등되면 페어링 모드로 전환됩니다.</span>
          <span style={{ fontSize: "16px", fontWeight: "500" }} className='mb-1'>2. 스마트폰 블루투스 기능이 켜져있는지 확인합니다.</span>
          <span style={{ fontSize: "16px", fontWeight: "500" }} className='mb-1'>3. 스마트폰의 블루투스 설정 창에서 기기 목록 중 <span style={{ color: "#0097B2" }}>"No Matter"</span>를 연결합니다.</span>
        </div>
        <div className='flex-column centered'>
          <img src="/images/bluetooth-connect.png" alt="connect bluetooth" style={{ width: "250px" }} className='mb-3'></img>
          <Button onClick={handleConnect} variant="contained" startIcon={<BluetoothRoundedIcon />} style={{ backgroundColor: "#0097B2" }}>
            Bluetooth
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className='container page-container'>
      {renderBluetooth()}
    </div>
  )
}

export default AddHub_Bluetooth