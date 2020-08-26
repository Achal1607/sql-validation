import React, { Component } from 'react'
import AceEditor from "react-ace";
import axios from 'axios';

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-solarized_dark";
export class Editor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: "",
            row: 0,
            result: null,
            rowErr: null,
        }
    }
    handleNewLine = () => {
        if (this.state.data !== "") {
            axios.post("/data", { data: this.state.data })
                .then(res => {
                    this.setState({ result: res.data.result },
                        () => {
                            if (!this.state.result.message && this.state.result.sql!=='\n')
                                this.setState({ rowErr: this.state.row > 0 ? this.state.row - 1 : 0 })
                            else {
                                this.setState({ rowErr: null })
                            }
                        })
                })
                .catch(err => alert(err))
        }
        else { alert("PLease Enter an SQL Query!!!") }
    }
    onChange = (newValue, e) => {
        if (newValue) {
            this.setState({ data: newValue }, () => {
                if (e.end.row !== this.state.row) {
                    this.setState({ row: e.end.row })
                    return this.handleNewLine()
                }
            })
        }
        else
            this.setState({data:newValue})
    }
    render() {
        return (
            <div>
                <AceEditor
                    mode="mysql"
                    theme="solarized_dark"
                    onChange={this.onChange}
                    fontSize="1.3em"
                    width="100%"
                    name="sql_editor"
                    editorProps={{ blockScrolling: true }}
                    focus={true}
                    wrapEnabled={true}
                    placeholder="Enter SQL Commands"
                    annotations={[{ row: this.state.rowErr, type: 'error', text: 'Syntax Error' }]}
                />
            </div>
        )
    }
}

export default Editor
