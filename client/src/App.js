import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Row, Col, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function App() {
    const [filelist, setFile] = useState([]);
    const [upload, setUpload] = useState(false);

    const beforeUpload = (file) => {
        setFile((filelist) => [...filelist, file]);
        return false;
    };

    const submit = async (e) => {
        setUpload(true);

        const data = new FormData();
        filelist.forEach((file) => {
            data.append('files', file, file.name);
        });
        data.append('name', 'famesensor');
        try {
            let res = await axios.post(
                'http://localhost:5000/api/image/upload-local-storage',
                data
            );
            message.success(res.data.data);
            setUpload(false);
            setFile([]);
        } catch (error) {
            message.error(error);
            setUpload(false);
            setFile([]);
        }
    };

    const onRemove = (file) => {
        const index = filelist.indexOf(file);
        const newFileList = filelist.slice();
        newFileList.splice(index, 1);
        setFile(newFileList);
    };

    return (
        <>
            <div className='App'>
                <div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={beforeUpload}
                                onRemove={onRemove}
                                multiple
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload File
                                </Button>
                            </Upload>
                            <p></p>
                            <Button
                                onClick={submit}
                                disabled={filelist.length === 0}
                                loading={upload}
                            >
                                {upload ? 'Uploading' : 'Start Upload'}
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default App;
