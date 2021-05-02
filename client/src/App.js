/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {
    Row,
    Col,
    Upload,
    Button,
    message,
    Divider,
    List,
    Typography
} from 'antd';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function App() {
    const { Title } = Typography;

    const [filelist, setFile] = useState([]);
    const [files, setFiles] = useState([]);
    const [upload, setUpload] = useState(false);

    useEffect(() => {
        featch();
    }, []);

    const featch = async () => {
        try {
            let resFiles = await axios.get('http://localhost:5000/api/files/');
            console.log(resFiles.data);
            setFiles(resFiles.data.data);
        } catch (error) {
            console.log(error);
        }
    };

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
                'http://localhost:5000/api/files/upload-local-storage',
                data
            );

            message.success(res.data.data);
            featch();
            setUpload(false);
            setFile([]);
        } catch (error) {
            console.log(error);
            // message.error(error);
            setUpload(false);
            setFile([]);
        }
    };

    const deleteFile = async (id) => {
        try {
            let res = await axios.patch(
                `http://localhost:5000/api/files/${id}`
            );

            console.log(res);
            message.success(res.data.data);
            featch();
        } catch (error) {
            console.log(error);
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
                <Divider plain>
                    {' '}
                    <Title>
                        <CloudUploadOutlined />
                        React File Management
                    </Title>
                </Divider>

                <div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Title level={4}> Upload File(Many)</Title>
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
                            <Divider orientation='left'>File List</Divider>
                            <List
                                size='large'
                                bordered
                                dataSource={files}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                            <a
                                                onClick={() =>
                                                    deleteFile(item._id)
                                                }
                                            >
                                                Delete
                                            </a>
                                        ]}
                                    >
                                        <a
                                            href={`http://localhost:5000/api/files/${item._id}`}
                                        >
                                            {item.imageName}
                                        </a>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <Title level={4}>
                                {' '}
                                Upload File To Cloud Firebase (in progess...)
                            </Title>
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
