const express = require('express');
const OSS = require('ali-oss');
const fs = require('fs');
const dotenv = require('dotenv');

let envTypeFileExists = false

if (!envTypeFileExists) {
    const envFileName = '.env.local'
    if (fs.existsSync(envFileName)) {
        dotenv.config({ path: envFileName });

    }
}

if (!envTypeFileExists) {
    const envFileName = '.env'
    if (fs.existsSync(envFileName)) {
        dotenv.config({ path: envFileName });
    }
}

const app = express();

// 创建 OSS 客户端实例
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
    bucket: 'poke-ball',
});

// 下载 OSS 对象
app.get('/download', async (req, res) => {
    const objectName = 'abstract-background-love-heart-seamless-vector-pattern.webp'; // object name
    const object = await client.get(objectName);
    const stream = fs.createWriteStream(objectName);
    stream.once('open', () => {
        res.write(object.content);
        res.end();
    });
});

app.listen(3500, () => {
    console.log('Server started on port 3500');
});
