import React, { Component, useRef } from "react";

import GendersService from "../../services/GendersService";

const gendersService = new GendersService();
const inputRef = useRef();

class GenderCreateUpdate extends Component {

     constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    componentDidMount(){
        const { match: { params }}= this.props;
        if(params && params.pk)
        {
            gendersService.getGender(params.pk).then((c)=> {
                this.refs.name.value = c.name;
            })
        }
    }

    handleCreate(){
        gendersService.createGender(
            {
                name: inputRef.current.value
                //"name": this.refs.name.value
            }).then((result)=> {
                alert("Género Creado!");
            }).catch(()=> {
                alert("¡Hubo un error! Vuelva a revisar su formulario.");
            });
    }

    handleUpdate(pk){
        gendersService.updateGender(
            {
                "id": pk,
                "name": this.refs.name.value
            }).then((result)=>{
                alert("Género Actualizado!");
            }).catch(()=>{
                alert('¡Hubo un error! Vuelva a revisar su formulario.');
            });
    }
 

    handleSubmit(event) {
        const { match: {params}} = this.props;
        if(params && params.pk){
            this.handleUpdate(params.pk);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="name">
                    Género:
                </label>
                <input type="text"  id="name" ref={inputRef}/>

                <input type="submit" value='Submit' />
            </div>
        </form>
        );
    }
}

export default GenderCreateUpdate;

