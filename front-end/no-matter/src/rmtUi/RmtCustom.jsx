import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GoBack from '../components/GoBack.jsx'
import axiosInstance from '../config/axios'

import { ButtonBase, Fab, Box, Modal, Button, InputLabel, MenuItem,
        FormControl, Select, TextField } from "@mui/material";
import { cyan } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'; // +
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'; // -

const RmtCustom = (props) => {
  const navigate = useNavigate();
  const isCreate = props.isCreate
  const [notSave, setNotSave] = useState(false)
  const [rmtName, setRmtName] = useState(props.remoteName)
  const [saveRmtName, setSaveRmtName] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)
  const [customButtonName, setCustomButtonName] = useState('')

  const [progress, setProgress] = React.useState(0);

  // React.useEffect(() => {
  //   const interval = 30000 / 100; 
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         clearInterval(timer);
  //         return 100;
  //       }
  //       return oldProgress + 1;
  //     });
  //   }, interval);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);



  useEffect(() => {
    if (props.remoteName === '') {
      setIsNameSet(true)
    } else (
      setSaveRmtName(props.remoteName)
    )
  }, [])

  const hubId = props.hubId

  const remoteSave = () => {
    setNotSave(false)

    axiosInstance({
      method : 'POST',
      url : '/remote/register',
      data: {
          "hubId" : hubId,
          "controllerName" : saveRmtName,
          "remoteType" : "Custom",
          "remoteCode" : "A1B2C3D4"
      }
    })
    // .then((res) => {
    //   console.log(res)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    cusBtnmapping.map(function(item) {
      // console.log('이름', item.name)
      axiosInstance({
        method: 'POST',
        url : 'custom/registerButtons',
        data: {
          button_name:item.name, height:item.position[0].icon, ir_signal:'', remote_id:'', width:''
        }
      })
      .then((res) => {
        // console.log(res)
        navigate(-1)
      })
      // .catch((err) => {
      //   console.log('버튼 등록 에러', err)
      // })
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    if (isCreate) {
      props.publishMessage(`${saveRmtName}/${e}`)
    } else {
      props.publishMessage(`${saveRmtName}/${e}`)
    }
  }

  const onNameChange = useCallback((event) => {
    setRmtName(event.currentTarget.value)
    // console.log(event.currentTarget.value)
  }, [])

  const settingRmtName = () => {
    if (rmtName !== '') {
      setSaveRmtName(rmtName)
      setIsNameSet(false)
    }
  }

  const [active, setActive] = useState(false);
  // const [currentX, setCurrentX] = useState(0);
  // const [currentY, setCurrentY] = useState(0);
  // const [initialX, setInitialX] = useState(0);
  // const [initialY, setInitialY] = useState(0);
  
  const [customButton, setCustomButton] = useState({
    // cusBtn1:[{icon:'AddIcon'}],
    // cusBtn2:[{icon:'HorizontalRuleIcon'}]
  })
  // console.log(customButton)
  const [open, setOpen] = useState(false);
  
  const [icon, setIcon] = useState('');
  
  const addButton = (e) => {
    let cntBtn = Object.keys(customButton).length
    const baseData = [{icon:e}]
    let copy = {...customButton}
    copy[`cusBtn${cntBtn+1}`] = baseData
    setCustomButton(copy)

    // axiosInstance({
    //   method: 'Post',
    //   url: 'custom/registerButtons',
    //   data: [`cusBtn${cntBtn+1}`, e]
    // })
    // .then((response) => {
    //   console.log(response)
    // })
  }

  // const dragStart = (e, name, positionData) => {
  //   if (e.type === 'touchstart') {
  //     setInitialX(e.touches[0].clientX - positionData.currentX);
  //     setInitialY(e.touches[0].clientY - positionData.currentY);
  //   } else {
  //     setInitialX(e.clientX - positionData.currentX);
  //     setInitialY(e.clientY - positionData.currentY);
  //   }
  //   setActive(true);
  // };

  // const dragEnd = (name, btnIcon) => {
  //   if (isCreate === true) {
  //     setInitialX(currentX);
  //     setInitialY(currentY);
  //     setActive(false);
  //     const data = [{active:active, currentX:currentX, currentY:currentY, icon:btnIcon}]
  //     updateBtn(name, data)}
  // };

  // const drag = (e, name, btnIcon) => {
  //   if (active) {
  //     if (e.type === 'touchmove') {
  //       setCurrentX(e.touches[0].clientX - initialX);
  //       setCurrentY(e.touches[0].clientY - initialY);
  //     } else {
  //       setCurrentX(e.clientX - initialX);
  //       setCurrentY(e.clientY - initialY);
  //     }
  //     const data = [{active:active, currentX:currentX, currentY:currentY, icon:btnIcon}]
  //     updateBtn(name, data)
  //   }
  // };

  /* 버튼 클릭시 실행 */
  // const onTouchStart = (e, positionData, name) => {
  //   if (isCreate === true) {
  //     updateBtn(name, positionData)
  //     selectBtn(e, positionData[0])
  //     dragStart(e, name, positionData[0])
  //   }
  // }

  /* 버튼 클릭시 실행되며 object에 저장된 x, y좌표값 state에 저장 */
  // const selectBtn = (e, positionData) => {
  //   if (isCreate === true) {
  //     setActive(positionData.active)
  //     setCurrentX(positionData.currentX)
  //     setCurrentY(positionData.currentY)
  //   }
  // };

  /* 버튼 좌표 object에 업데이트 */
  const updateBtn = (key, data) => {
    delete customButton[key]
    let copy = {...customButton}
    // const datas = [{active:active, currentX:currentX, currentY:currentY, icon:data[0].icon}]
    copy[key] = data
    setCustomButton(copy)
  }

  
  // 모달
  const location = useLocation()
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',  
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleCustomButtonName = useCallback((e) => {
    setCustomButtonName(e.currentTarget.value)
    // console.log(e)
  })
  
  const selectButton = () => {
    setOpen(true);
  }
  /* 리모컨 추가페이지 일때 모달 확인 버튼 함수 */
  const handleAddClose = () => {
    setOpen(false);
    addButton(icon)
  };
  
  /* 리모컨 버튼 추가 버튼 클릭 */
  const handleAddClick = () => {
    selectButton()
    // 신호를 입출력할 함수 필요
  }
  
  // 아이콘 선택
  const handleChange = (event) => {
    setIcon(event.target.value);
  };
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case "AddIcon":
        return <AddIcon />;
      case "HorizontalRuleIcon":
        return <HorizontalRuleIcon />;
      case "Chicken":
        return <img src='/custom/chicken.png' style={{width:"30px"}}/>
      case "Dolphin":
        return <img src='/custom/dolphin.png' style={{width:"30px"}}/>
      case "Duck":
        return <img src='/custom/duck.png' style={{width:"30px"}}/>
      case "Elephant":
        return <img src='/custom/elephant.png' style={{width:"30px"}}/>
      case "Rabbit":
        return <img src='/custom/rabbit.png' style={{width:"30px"}}/>
      case "Monkey":
        return <img src='/custom/monkey.png' style={{width:"30px"}}/>
      case "Penguin":
        return <img src='/custom/penguin.png' style={{width:"30px"}}/>
      case "Sheep":
        return <img src='/custom/sheep.png' style={{width:"30px"}}/>
      case "Squirrel":
        return <img src='/custom/squirrel.png' style={{width:"30px"}}/>
    default:
      return null;
    }
  };

  /* object 순회 mapping */
  const cusBtnmapping = Object.entries(customButton).map(([name, position], index) => ({
    name,
    position,
    index,
  }));

  cusBtnmapping.map(function(item) {
    // console.log('이름', item.name)
  })
        
  return (
    <>
    {/* {!notSave ? 
      <div className="container page-container">
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div style={{
            width: "500px",
            height: "500px",
            backgroundImage: `url("/images/logoGif.gif")`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            color: "black", // 텍스트 색상 설정,
            fontSize: "30px",
            fontWeight: "bold"
          }}>
            30초 정도 소요됩니다...
          </div>
          <Box sx={{ width: '100%' }}>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </Box>
        </div>
      </div>    
      
      :       */}

    <div id="outerContainer">
      <div className='d-flex flex-column mt-5'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            {
              isCreate === true ?
              <div onClick={() => setNotSave(true)}>
                <i className="bi bi-chevron-left fs-2 me-3"></i>
              </div> : <GoBack/>
            }
            <h1 className="font-700">{saveRmtName}</h1>
          </div>
          <div>
            {
              isCreate === true ? 
              <Fab size='small' color={cyan[700]} aria-label="add" 
              onClick={() => {handleAddClick()}}>
                <AddIcon />
              </Fab>
              : null
            }
            {
              isCreate === true ? 
              <button 
                className='btn'
                style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
                onClick={remoteSave}
                >저장하기
              </button> : 
              null
            }
          </div>
        </div>
        <hr />
        { isCreate === true ?
          <Modal
          open={notSave}
          onClose={() => setNotSave(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">리모컨 선택화면으로 돌아갑니다</h2>
              <p id="child-modal-description">
                변경사항이 저장되지 않을수도 있습니다
              </p>
              <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button onClick={() => (navigate(-1))}>확인</Button>
                <Button onClick={() => setNotSave(false)}>취소</Button>
              </div>
            </Box>
          </Modal> : null
        }
        { isCreate === true ?
          <Modal
          open={isNameSet}
          onClose={() => setIsNameSet(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">리모컨의 이름을 입력해주세요</h2>
              {
                rmtName.length <= 5 ? 
                <div>
                  <TextField
                  id="filled-basic"
                  label="리모컨 이름"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={rmtName}
                  onChange={onNameChange}
                  autoFocus
                />
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                  <Button onClick={() => settingRmtName()}>확인</Button>
                  <Button onClick={() => navigate(-1)}>취소</Button>
                </div>
              </div> : 
              <div>
                <TextField
                  id="filled-basic"
                  label="리모컨 이름"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={rmtName}
                  onChange={onNameChange}
                  error={true}
                  helperText={'5글자 이하로 적어주세요'}
                  autoFocus
                />
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                  <Button onClick={() => navigate(-1)}>취소</Button>
                </div>
              </div>
              }
            </Box>
          </Modal> : null
        }
        {
          isCreate === true ? <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 300 }}>
              <h2 id="child-modal-title">버튼을 추가합니다</h2>
              <p id="child-modal-description">
                허브를 향해<br/>리모컨 버튼을 눌러주세요
              </p>
              <Box sx={{ minWidth: 120 }}>
                <TextField
                  id="filled-basic"
                  label="버튼 이름"
                  variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                  value={customButtonName}
                  onChange={handleCustomButtonName}
                  // helperText={'5글자 이하로 적어주세요'}
                  autoFocus
                />
                <div style={{marginTop:'30px'}}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">아이콘</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={icon}
                    label="Icon"
                    onChange={handleChange}
                    >
                    <MenuItem value={'AddIcon'}>+</MenuItem>
                    <MenuItem value={'HorizontalRuleIcon'}>-</MenuItem>
                    <MenuItem value={'Chicken'}><img src='/custom/chicken.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Dolphin'}><img src='/custom/dolphin.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Duck'}><img src='/custom/duck.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Elephant'}><img src='/custom/elephant.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Rabbit'}><img src='/custom/rabbit.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Monkey'}><img src='/custom/monkey.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Penguin'}><img src='/custom/penguin.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Sheep'}><img src='/custom/sheep.png' style={{width:"20px"}}/></MenuItem>
                    <MenuItem value={'Squirrel'}><img src='/custom/squirrel.png' style={{width:"20px"}}/></MenuItem>
                  </Select>
                </FormControl>
                </div>
              </Box>
              <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button onClick={handleAddClose}>확인</Button>
                <Button onClick={handleClose}>취소</Button>
              </div>
            </Box>
          </Modal> 
          : null
        }
        {/* {
          isCreate === true ? 
          <Fab color="secondary" aria-label="add" onClick={handleAddClick()}>
            <AddIcon />
          </Fab>
          : null
        } */}
        <div className="d-flex justify-content-center">
        { cusBtnmapping.map((item) => (
            <div className="custom-button" key={item.name}>
              {/* <div
                id="container"
                // onTouchStart={(e) => {onTouchStart(e, item.position, item.name)}}
                // onTouchEnd={() =>{dragEnd(item.name, item.position[0].icon)}}
                // onTouchMove={(e) => {drag(e, item.name, item.position[0].icon)}}
              > */}
                {/* <div
                  id="item"
                  style={{
                    // position: 'absolute',
                    // left: `${item.position[0].currentX}px`,
                    // top: `${item.position[0].currentY}px`,
                    display: 'flex'
                  }}
                > */}
                    {/* <Fab color="primary" aria-label="add">
                      <AddIcon />
                    </Fab> */}
                    <ButtonBase
                      key={item.name}
                      component={Fab}
                      style={{ borderRadius: "50%" }}
                      onClick={() => {handleClick(item.name)}}
                    >
                      {getIcon(item.position[0].icon)}
                    </ButtonBase>
                {/* </div>
              </div> */}
            </div>
          )
        )}
        </div>
      </div>
    </div>
    {/* } */}
    </>
  );
};

export default RmtCustom;
