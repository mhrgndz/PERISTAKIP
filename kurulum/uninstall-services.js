var Service = require('node-windows').Service;
const path = require('path');

var svc = new Service
({
    name:'Personel Is Takip',
    description: 'Personel Is Takip',
    script: path.join(process.cwd(), '..\\server.js'),
    env: 
    [
        {
            name: 'APP_DIR_PATH',
            value: process.cwd()
        }
    ]
});

svc.on('uninstall',function()
{
    svc.stop();
});
svc.uninstall();