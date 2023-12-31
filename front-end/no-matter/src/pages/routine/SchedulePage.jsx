import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import GoBack from '../../components/GoBack.jsx'

export default function VerticalTabs() {
  const navigate = useNavigate()

  const [day, setDay] = React.useState({
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
    일: false,
  });
  const [hour, setHour] = React.useState(1);
  const [minute, setMinute] = React.useState(0);
  const [ampm, setAmPm] = React.useState("am");

  const selectedDays = Object.entries(day).reduce((selected, [day, isActive]) => {
    if (isActive) {
      selected.push(day);
    }
    return selected;
  }, []);
  
  const onDayChange = (event) => {
    // console.log(event.target.name)
    setDay({ ...day, [event.target.name]: event.target.checked });
  };
  const onHourChange = (event, hour) => {
    // console.log(hour)
    setHour(hour);
  };
  const onMinuteChange = (event, minute) => {
    // console.log(minute)
    setMinute(minute);
  };
  const onAmPmChange = (event, ampm) => {
    // console.log(ampm)
    setAmPm(ampm);
  };

  const onSubmit = () => {
    navigate('/routine/result', { state: { kind: "schedule", condition: { day: selectedDays, hour: hour, minute: minute, ampm: ampm}, editing: false } });
  }


  return (
      <div className='container page-container'>
        <div className='d-flex mt-5 mb-3'>
          <GoBack /> 
          <h1 className="font-700">스케줄 등록</h1>
        </div>
        <div className='d-flex justify-content-end container'>
          <button 
              className='mb-3 btn'
              style={{backgroundColor:"#0097B2", color:"#FCFCFC"}}
              onClick={onSubmit}
              >NEXT</button>
        </div>

        <div className='d-flex flex-column justify-content-center align-items-center' style={{width:"100%"}}>
            <p style={{fontSize:"15px", width:"80%", marginBottom:"3px", marginLeft:"5px"}}><i className="bi bi-calendar-week" style={{marginRight:"4px"}}></i>반복 요일 설정</p>
            <FormGroup sx={{ display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            width: "80%",
                            height:"50px",
                            margin:"0px 0px 40px 0px",
                            border: '0.6px solid',
                            borderColor: 'grey.400', 
                            borderRadius: '6px' 
                            }}
            >
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="월" checked={day.월} onChange={onDayChange}/>} label={<Typography variant="caption">월</Typography>} style={{margin:"0px"}} />
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="화" checked={day.화} onChange={onDayChange}/>} label={<Typography variant="caption">화</Typography>} style={{margin:"0px"}} />
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="수" checked={day.수} onChange={onDayChange}/>} label={<Typography variant="caption">수</Typography>} style={{margin:"0px"}} />
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="목" checked={day.목} onChange={onDayChange}/>} label={<Typography variant="caption">목</Typography>} style={{margin:"0px"}} />
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="금" checked={day.금} onChange={onDayChange}/>} label={<Typography variant="caption">금</Typography>} style={{margin:"0px"}} />
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="토" checked={day.토} onChange={onDayChange}/>} label={<Typography variant="caption">토</Typography>} style={{margin:"0px"}} />
                <FormControlLabel control={<Checkbox sx={{ width: 20, height: 20, margin:"2px" }} name="일" checked={day.일} onChange={onDayChange}/>} label={<Typography variant="caption">일</Typography>} style={{margin:"0px"}} />
            </FormGroup>
        </div>
        

        <div className='d-flex flex-column justify-content-center align-items-center' style={{width:"100%"}}>
            <p style={{fontSize:"15px", width:"80%", marginBottom:"3px", marginLeft:"5px"}}><i className="bi bi-clock" style={{marginRight:"4px"}}></i>시간 설정</p>
        
            <Box
            sx={{ bgcolor: 'background.paper', 
                display: 'flex', 
                justifyContent: 'space-between',
                width: "80%",
                border: '0.6px solid',
                borderColor: 'grey.400', 
                borderRadius: '6px' }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={hour}
                    onChange={onHourChange}
                    sx={{ borderRight: 1, borderColor: 'divider', height: "40vh" }}
                >
                    <Tab label="1" value={1}/>
                    <Tab label="2" value={2} />
                    <Tab label="3" value={3} />
                    <Tab label="4" value={4} />
                    <Tab label="5" value={5} />
                    <Tab label="6" value={6} />
                    <Tab label="7" value={7} />
                    <Tab label="8" value={8} />
                    <Tab label="9" value={9} />
                    <Tab label="10" value={10}  />
                    <Tab label="11" value={11}  />        
                    <Tab label="12" value={12} />
                </Tabs>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={minute}
                    onChange={onMinuteChange}
                    sx={{ borderRight: 1, borderColor: 'divider', height: "40vh" }}
                >
                  <Tab label="00" value={0} />
                  <Tab label="01" value={1} />
                  <Tab label="02" value={2} />
                  <Tab label="03" value={3} />
                  <Tab label="04" value={4} />
                  <Tab label="05" value={5} />
                  <Tab label="06" value={6} />
                  <Tab label="07" value={7} />
                  <Tab label="08" value={8} />
                  <Tab label="09" value={9} />
                  <Tab label="10" value={10} />
                  <Tab label="11" value={11} />
                  <Tab label="12" value={12} />
                  <Tab label="13" value={13} />
                  <Tab label="14" value={14} />
                  <Tab label="15" value={15} />
                  <Tab label="16" value={16} />
                  <Tab label="17" value={17} />
                  <Tab label="18" value={18} />
                  <Tab label="19" value={19} />
                  <Tab label="20" value={20} />
                  <Tab label="21" value={21} />
                  <Tab label="22" value={22} />
                  <Tab label="23" value={23} />
                  <Tab label="24" value={24} />
                  <Tab label="25" value={25} />
                  <Tab label="26" value={26} />
                  <Tab label="27" value={27} />
                  <Tab label="28" value={28} />
                  <Tab label="29" value={29} />
                  <Tab label="30" value={30} />
                  <Tab label="31" value={31} />
                  <Tab label="32" value={32} />
                  <Tab label="33" value={33} />
                  <Tab label="34" value={34} />
                  <Tab label="35" value={35} />
                  <Tab label="36" value={36} />
                  <Tab label="37" value={37} />
                  <Tab label="38" value={38} />
                  <Tab label="39" value={39} />
                  <Tab label="40" value={40} />
                  <Tab label="41" value={41} />
                  <Tab label="42" value={42} />
                  <Tab label="43" value={43} />
                  <Tab label="44" value={44} />
                  <Tab label="45" value={45} />
                  <Tab label="46" value={46} />
                  <Tab label="47" value={47} />
                  <Tab label="48" value={48} />
                  <Tab label="49" value={49} />
                  <Tab label="50" value={50} />
                  <Tab label="51" value={51} />
                  <Tab label="52" value={52} />
                  <Tab label="53" value={53} />
                  <Tab label="54" value={54} />
                  <Tab label="55" value={55} />
                  <Tab label="56" value={56} />
                  <Tab label="57" value={57} />
                  <Tab label="58" value={58} />
                  <Tab label="59" value={59} />
                </Tabs>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={ampm}
                    onChange={onAmPmChange}
                    sx={{ height: "40vh" }}
                    className='d-flex flex-column justify-content-center align-items-center'
                >
                    <Tab label="AM" value={"am"}/>
                    <Tab label="PM" value={"pm"} />
                </Tabs>
            </Box> 
        </div>

    
    </div>
  );
}