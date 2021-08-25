const express = require('express')
const path = require('path')
const app = express()

// Routes
app.all(`*`, (req, res) => {
  const https = require('https')
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Credentials', true)
        res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        res.set('Access-Control-Allow-Headers', '*')
        res.set('Access-Control-Max-Age', '86400')
        return res.status(204).send()
    }
    const headers = req.headers;
    let {rawBody: body} = req
    delete headers['host']
    delete headers['Host']
    delete headers['X-Forwarded-For']
    delete headers['x-forwarded-for']
    const t = req.path
    const p = /search\/type/i.test(t) ?
        '/x/web-interface/search/type' : /playurl/i.test(t) ?
            req.query.platform === 'android' ?
                '/pgc/player/api/playurl' : '/pgc/player/web/playurl' : ''
    if (!p) {
        return res.status(404).send("Page Not found:" + req.url)
    }
    if (body) {
        delete headers['Content-Length']
        delete headers['content-length']
        headers['Content-Length'] = Buffer.byteLength(body, 'utf8')
    }
    if (!/bilibili/.test(headers.referer)) headers.referer = 'https://www.bilibili.com/'
    const host = 'api.bilibili.com'
    const opt = {
        hostname: host,
        port: 443,
        path: p + req.url.replace(t, '/'),
        method: req.method,
        headers: headers,
    }
    const q = https.request(opt, re => {
        res.set(re.headers).status(re.statusCode)
        const da = []
        re.on('data', d => da.push(d));
        re.on('end', () => {
            res.send(Buffer.concat(da))
        });
    });
    q.on('error', (e) => {
        res.status(500).send(e.message)
    });
    if (body) q.write(body)
    q.end();
})

app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
})
