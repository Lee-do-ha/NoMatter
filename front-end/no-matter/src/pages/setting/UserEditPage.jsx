import React, {useCallback, useState} from 'react'
import { TextField, Button } from '@material-ui/core'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../config/axios'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Swal from 'sweetalert2'
import GoBack from '../../components/GoBack.jsx'

function UserEditPage() {
  const navigate = useNavigate()

  const [cur, setCur] = useState(true)

  const [curPwd, setCurPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const [newConfirmPassword, setNewConfirmPassword] = useState("")

  const [newPwdCheck, setNewPwdCheck] = useState(true)
  const [newPwdMsg, setNewPwdMsg] = useState("")
  const [newConfirmPwdCheck, setNewConfirmPwdCheck] = useState(true)
  const [newConfirmPwdMsg, setNewConfirmPwdMsg] = useState("")


  const onCurPasswordHandler = useCallback((event) => {
    setCurPwd(event.currentTarget.value)

  },[])

  const onNewPasswordHandler = useCallback((event) => {
    const newPwdReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

    setNewPwd(event.currentTarget.value)

    if(event.currentTarget.value===curPwd){
      setNewPwdMsg('현재 비밀번호와 다른 비밀번호를 설정해주세요')
      setNewPwdCheck(false)
    }    
    else if(!newPwdReg.test(event.currentTarget.value)){
      setNewPwdMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요')
      setNewPwdCheck(false)
    }
    else{
      setNewPwdMsg('안전한 비밀번호입니다')
        setNewPwdCheck(true)
    }        
  })

const onNewConfirmPasswordHandler = useCallback((event) => {
  setNewConfirmPassword(event.currentTarget.value)

    if(event.currentTarget.value === newPwd){
      setNewConfirmPwdMsg('비밀번호가 일치합니다')
      setNewConfirmPwdCheck(true)
    }
    else{
      setNewConfirmPwdMsg('비밀번호가 일치하지 않습니다')
      setNewConfirmPwdCheck(false)
    }        
  },[newPwd])

    

  const onCheck = (event) => {
    event.preventDefault()
    axiosInstance({
      method : 'Get',
      url : `/user/passwordCheck/${curPwd}`,
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
  })
  .then((response) => {
      window.confirm('확인되었습니다')
      setCur(false)
  })
  .catch((err) => {
      alert('현재 비밀번호가 일치하지않습니다')
      setCur(true)
    })

  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    axiosInstance({
      method : 'Post',
      url : `/user/modify`,
      data : {password:newPwd},
      headers: {Authorization:`Bearer ${sessionStorage.getItem('authToken')}`}
  })
  .then((response) => {
      window.confirm('비밀번호 수정이 완료되었습니다')
      setCur(false)
      navigate('/login')
  })
  .catch((err) => {
      alert('비밀번호 수정이 완료되지 않았습니다')
      setCur(true)
    })
  }



  const deleteUser = (e) => {
    Swal.fire({
      html: '<h2 style="font-size: 1.3em;">진짜 탈퇴하시겠습니까?</h2>',      
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `탈퇴`,
      cancelButtonText: `취소`,
    }).then((result) => {
      if (result.isDenied) {
        axiosInstance({
          method : 'Delete',
          url : `user/delete`,
        })
        .then(() => {
          Swal.fire('회원탈퇴가 완료되었습니다.', '', 'info')
          sessionStorage.clear()
          localStorage.clear()
          navigate('/')
        })
      }
    })
  }

  return (
    <div className="page-container container">
      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">회원 정보 수정</h1>
        </div>
      </div>
      <hr />

      <div style={{marginTop:"20px"}}>
        <div style={{marginBottom:"20px"}}>
          <p style={{margin:"8px"}}>현재 비밀번호를 입력해주세요</p>
          <TextField
            variant={cur?"outlined":"filled"}
            required
            fullWidth
            value={curPwd}
            onChange={onCurPasswordHandler}
            name="curPwd"
            // error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
            label="현재 비밀번호"
            type="password"
            id="curPwd"
            autoComplete="current-password"     
            disabled={!cur}       
          />
          <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={onCheck}
          className="button"
          style={{ backgroundColor: "#0097B2", color: "#FFFFFF", margin:"1px"}}
          >
            확인
          </Button>
        </div>

        <div style={{marginBottom:"20px"}}>
          <p style={{margin:"8px"}}>새로운 비밀번호를 입력해주세요</p>
          <TextField
            variant={cur?"filled":"outlined"}
            required
            fullWidth
            value={newPwd}
            onChange={onNewPasswordHandler}
            name="newPwd"
            // error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
            label="새로운 비밀번호"
            type="password"
            id="newPwd"
            autoComplete="current-password"
            error={!newPwdCheck}
            disabled={cur}
          />
          {newPwd.length > 0 && <span className={`message ${newPwdCheck ? 'success' : 'error'}`}>{newPwdMsg}</span>}              
        </div>

        <div style={{marginBottom:"20px"}}>
          <p style={{margin:"8px"}}>새로운 비밀번호를 다시 입력해주세요</p>
          <TextField
            variant={cur?"filled":"outlined"}
            required
            fullWidth
            value={newConfirmPassword}
            onChange={onNewConfirmPasswordHandler}
            name="newConfirmPassword"
            // error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
            label="새로운 비밀번호 확인"
            type="password"
            id="newConfirmPassword"
            autoComplete="current-password"
            error={!newConfirmPwdCheck}
            disabled={cur}
          />
          {newConfirmPassword.length > 0 && <span className={`message ${newConfirmPwdCheck ? 'success' : 'error'}`}>{newConfirmPwdMsg}</span>}              

        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={onSubmitHandler}
          // color="primary"
          className="button"
          style={{ backgroundColor: "#0097B2", color: "#FFFFFF"}} >
          비밀번호 수정
          </Button>
      </div>
      <div onClick={deleteUser} className='centered' style={{color:"crimson", textDecoration:"underline", margin:"60px"}}>
        <SentimentVeryDissatisfiedIcon style={{fontSize:"24px"}}/>회원 탈퇴
      </div>

    </div>
  )
}

export default UserEditPage