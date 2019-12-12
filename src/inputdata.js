import React, { Component } from 'react';

class InputData extends Component {

  constructor(props) {

    super(props)
    
    this.InputDay       = React.createRef()
    this.InputMonth     = React.createRef()
    this.InputYear      = React.createRef()
    this.buttonCalendar = React.createRef()
    this.quadro         = React.createRef()

    this.state = { 
        dia: props.value ? props.value.substring(0,2):"", 
        mes: props.value ? props.value.substring(3,5):"", 
        ano: props.value ? props.value.substring(6,10):"",
        data: props.value ? props.value:""
    }

  }

  validatedate = (inputText) => {

    let dateformat = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    
    // Match the date format through regular expression
    if (inputText.match(dateformat)) {
        //Test which seperator is used '/' or '-'
        let opera1 = inputText.split('/');
        let opera2 = inputText.split('-');
        let lopera1 = opera1.length;
        let lopera2 = opera2.length;
        // Extract the string into month, date and year
        let pdate = ""
        if (lopera1 > 1) {
            pdate = inputText.split('/');
        } else if (lopera2 > 1) {
            pdate = inputText.split('-');
        }
        let dd = parseInt(pdate[0]);
        let mm = parseInt(pdate[1]);
        let yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm === 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                this.setState({ message: "Invalid date format!"});
                return false;
            }
        }
        if (mm === 2) {
            let lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear === false) && (dd >= 29)) {
                this.setState({ message: "Invalid date format!"});
                return false;
            }
            if ((lyear === true) && (dd > 29)) {
                this.setState({ message: "Invalid date format!"});
                return false;
            }
        }
    } else {
      this.setState({ message: "Invalid date format!"});
        return false;
    }
  }

  handleKey = event => {

    let { id, value, key } = event.target

    // trata tecla backspace
    if (key === 8 && value === "") {
      if (id === "inputDataMonth") {
        this.InputDay.current.focus()
      }
      if (id === "inputDataYear") {
        this.InputMonth.current.focus()
      }
    }

    this.handleValue( id, value, key )
    
  }

  handleValue = (id, value, key) => {

    if (id === "inputDataDay") {
      this.setState({ ...this.state,dia: value })
    }

    if (id === "inputDataMonth") {
      this.setState({ ...this.state,mes: value })
    }

    if (id === "inputDataYear") {
      this.setState({ ...this.state,ano: value })
    }

    // backspace
    if (value === "" && key === 8) {
      if (id === "inputDataMonth") {
        this.InputDay.current.focus()
      }
      if (id === "inputDataYear") {
        this.InputMonth.current.focus()
      }
    }

    let dataTemp =  ("00" + this.state.dia).substr(-2,2) + "/" + 
                    ("00" + this.state.mes).substr(-2,2) + "/" + 
                    this.state.ano

    if (this.validatedate(dataTemp)) {

      this.setState(
        { 
          data: 
            ("00" + this.state.dia).substr(-2,2) + "/" + 
            ("00" + this.state.mes).substr(-2,2) + "/" + 
            this.state.ano
        }
      )
debugger
      this.props.onChange(this.state.data)
    
    }
  }

  handleValidation = (event) => {

    let { id, value } = event.target;

    let valorInt = parseInt(value)

    if (isNaN(valorInt) && value !== "") {
      this.quadro.current.style = this.state.bordaErro
      this.handleValue(id,value,0)
      return false
    }

    // valida dias entre 01 e 31
    if (id === "inputDataDay") {
      this.setState({ ...this.state,dia: value })
      if (valorInt < 1 || valorInt > 31) {
        this.InputDay.current.focus()
        this.quadro.current.style = this.state.bordaErro
        return false
      }
    }

    // valida meses entre 01 e 12
    if (id === "inputDataMonth") {
      this.setState({ ...this.state,mes: value })
      if (valorInt < 1 || valorInt > 12) {
        this.InputMonth.current.focus()
        this.quadro.current.style = this.state.bordaErro
        return false
      }
    }

    // valida anos entre 1900 e 9999
    if (id === "inputDataYear") {
      this.setState({ ...this.state,ano: value })
      if (valorInt < 1900 || valorInt > 9999) {
        this.InputYear.current.focus()
        this.quadro.current.style = this.state.bordaErro
        return false
      }
    }

    //this.handleFocus(id,value, maxLength)
    
    return true

  }

  handleInput = event => {
    
    let { id, value, maxLength } = event.target;

    if (!this.handleValidation(event)) {
      return
    }

    // autofill
    this.handleFocus(id, value, maxLength)

  }

  handleFocus = (id, value, maxLength) => {
    if (value.length>=maxLength) {
      if (id === "inputDataDay") {
        this.InputMonth.current.focus()
      }
      if (id === "inputDataMonth") {
        this.InputYear.current.focus()
      }
      if (id === "inputDataYear") {
        this.buttonCalendar.current.focus()
      }
    }
  }
  
  render() {
    const retorno = 
      <span>      
        <span id = "inputDataQuadro"
              ref = {this.quadro}>
                
        <input  id = "inputDataDay"
                maxLength = "2"
                size = "1"
                ref = {this.InputDay}
                onChange = {this.handleInput}
                onKeyUp = {this.handleKey}
                value = {this.state.dia}
                />/
        <input  id = "inputDataMonth"
                maxLength = "2"
                size = "1"
                ref = {this.InputMonth}
                onChange = {this.handleInput}
                onKeyUp = {this.handleKey}
                value = {this.state.mes}
                />/
        <input  id = "inputDataYear" 
                maxLength="4" 
                size="2" 
                ref = {this.InputYear}
                onChange = {this.handleInput}
                onKeyUp = {this.handleKey}
                value = {this.state.ano}
                />
        &nbsp;
        <input  id = "buttonCalendar" 
                type="button" 
                value="Calendario"
                ref = {this.buttonCalendar}
                />
        </span>

        <p>{JSON.stringify(this.state)}</p>
        <p>{JSON.stringify(this.props)}</p>

      </span>

    return retorno;
  }
}

export default InputData;