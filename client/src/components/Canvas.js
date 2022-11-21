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

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
  }, [])

  useEffect(() => {
    if (canvasState.userName) {
      const socket = new WebSocket('ws://localhost:5000/')
      canvasState.setSessionId(params.id)
      canvasState.setSocket(socket)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        console.log('Connection OK')
        socket.send(JSON.stringify({
          id: params.id,
          userName: canvasState.userName,
          method:'connection'
        }))
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.userName} has connected`)
            break
          case 'draw':
            drawHandler(msg)
            break
        }

      }
    }
    
  }, [canvasState.userName])

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'finish':
        ctx.beginPath()
        break
    }
  }

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