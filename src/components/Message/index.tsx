import { createRoot } from "react-dom/client"
import MessageBox from "./MessageBox"
import { CreateMessageFunc, MessageFunc } from "./types"
import "./index.css"

const createContainer = () => {
  // get wrapper
  let wrapper = document.querySelector("#message-wrapper")

  // if not , init wrapper
  if (!wrapper) {
    wrapper = document.createElement('div')
    wrapper.id = "message-wrapper"
    document.body.appendChild(wrapper)
  }

  // create containerDiv
  const container = document.createElement("div")
  container.className = "message-container"

  // push children into container div
  wrapper.appendChild(container)

  return container
}

const createMessage: CreateMessageFunc = (type, message) => {
  const container = createContainer()
  const root = createRoot(container)

  // render message
  root.render(<MessageBox {...{type, message}} />)

  // remove message
  setTimeout(() => {
    root.unmount()
    container.remove()
  }, 4000);

}

// list message type
export const messageInfo: MessageFunc = (message) => {
  createMessage("info", message)
}

export const messageSuccess: MessageFunc = (message) => {
  console.log("success called")
  createMessage("success", message)
}
export const messageWarning: MessageFunc = (message) => {
  console.log("warning info called")
  createMessage("warning", message)
}
export const messageError: MessageFunc = (message) => {
  console.log('alert called')
  createMessage("error", message)
}

