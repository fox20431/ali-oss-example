# Ali OSS API 使用教程

参考：https://help.aliyun.com/document_detail/111256.html?spm=a2c4g.32068.0.0.6b7426c0C9NUIe

为什么需要API，因为考虑到隐私内容上传问题。


为了能使程序正常运作，请将`.env`的`ALI_ACCESS_KEY_ID`和`ALI_ACCESS_KEY_SECRET`修改为自己的。

关于该key和value的获取可以进入[阿里RAM](https://ram.console.aliyun.com/users)进行获取，同时请注意**用户是否拥有OSS访问权限**。

同时你还需要修改OSS客户端中的`region`和`bucket`：

```js
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
    bucket: 'poke-ball',
});
```

`region`参考你的OSS所在地，这个可以在你的bucket概览页面下的访问端口中的地域节点看到，只需要截取前面文本部分作为该region即可。

`bucket`参考你要操作的bucket的名字。

还有一个就是你要获取的Object

```js
app.get('/download', async (req, res) => {
    const objectName = 'abstract-background-love-heart-seamless-vector-pattern.webp'; // object name
    const object = await client.get(objectName);
    const stream = fs.createWriteStream(objectName);
    stream.once('open', () => {
        res.write(object.content);
        res.end();
    });
});
```

这里的`objectName`填写object的名字，即不包括Bucket名称在内的Object的完整路径。

修改完毕之后，可以使用`node index.js`来运行程序，你就可以通过网页访问`http://localhost:3500/download`来访问你的私有Object了。