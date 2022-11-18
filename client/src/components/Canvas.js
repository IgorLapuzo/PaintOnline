import React, { useEffect, useRef, useState } from 'react';
import '../styles/canvas.scss';
import {observer} from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const Canvas = observer(() => {
  const canvasRef = useRef()
  const userNameRef = useRef()
  const [modal, setModal] = useState(true)
  const params = useParams()
  console.log(params)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvasState.userName) {
      const socket = new WebSocket('ws://localhost:5000/')
      socket.onopen = () => {
        console.log('Connection OK')
        socket.send(JSON.stringify({
          id: params.id,
          userName: canvasState.userName,
          method:'connection'
        }))
      }
      socket.onmessage = (event) => {
        console.log(event.data)
      }
    }
    
  }, [canvasState.userName])

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const connectionHandler = () => {
    canvasState.setUserName(userNameRef.current.value)
    setModal(false)
  }

  const hide = () => {

  }

  return (
    <div className='canvas'>
      <Modal show={modal} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' ref={userNameRef}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={connectionHandler}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={700} height={500}/>
    </div>
  );
})

export default Canvas;