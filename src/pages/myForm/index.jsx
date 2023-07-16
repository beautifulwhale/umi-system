import React, { Children, forwardRef, useImperativeHandle, useState } from 'react'

export default () => {
  const form = React.useRef(null)
  const submit = () => {
    /* 表单提交 */
    form.current.submitForm((formValue) => {
      console.log(formValue)
    })
  }
  const reset = () => {
    /* 表单重置 */
    form.current.resetForm()
  }
  return <div className='box' >
    <Form ref={form} >
      <FormItem name="name" label="我是"  >
        <Input />
      </FormItem>
      <FormItem name="mes" label="我想对大家说"  >
        <Input />
      </FormItem>
      {/* <input  placeholder="不需要的input" />
          <Input/> */}
    </Form>
    <div className="btns" >
      <button style={{ background: 'red' }} onClick={submit} >提交</button>
      <button className="concellbtn" onClick={reset} >重置</button>
    </div>
  </div>
}


const Form = forwardRef(({ children }, ref) => {
  const [formValue, setFormValue] = useState({})

  // 封装表单方法
  useImperativeHandle(ref, () => ({
    submitForm: (cb) => {
      cb({ ...formValue })
    },
    resetForm: () => {
      const copyFormValue = { ...formValue }
      Object.keys(copyFormValue).forEach(key => {
        copyFormValue[key] = ''
      })
      setFormValue(copyFormValue)
    }
  }))

  // 根据name更改状态
  const setValues = (name, value) => {
    setFormValue((state) => {
      state[name] = value
      return { ...state }
    })
  }

  // 过滤掉除FormItem 其他react element
  const renderElements = []
  Children.forEach(children, (child) => {
    if (child.type.displayName === 'FormItem') {
      const { name, children } = child.props
      const childItem = React.cloneElement(child, {
        key: name,
        value: formValue[name],
        onChange: setValues
      }, children)
      renderElements.push(childItem)
    }
  })
  return renderElements
})

const FormItem = ({ children, label, value, name, onChange }) => {
  const handleChange = (value) => {
    onChange(name, value)
  }
  return (
    <>
      <span>{label}: </span>
      {
        React.isValidElement(children) && children.type.displayName === 'Input' ? React.cloneElement(children, { value, handleChange }) : null
      }
    </>
  )
}
FormItem.displayName = 'FormItem'

const Input = ({ handleChange, value }) => {
  return <input type="text" value={value} onChange={(e) => handleChange && handleChange(e.target.value)} />
}
Input.displayName = 'Input'


