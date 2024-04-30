window.onload = function() {
    var fileList = document.getElementById('fileList');



    // 发送 AJAX 请求获取文件列表
    function getFileList(path) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'get_files.php?path=' + encodeURIComponent(path.replace(/\//g, '//')), true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                var files = JSON.parse(xhr.responseText);
                // 清空文件列表
                fileList.innerHTML = '';
                
                // 添加返回上一级目录的链接
                if (path !== '') {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.setAttribute('href', '#返回上一级文件夹');
                    a.textContent = '   ←返回上一级文件夹';
                    a.addEventListener('click', function() {
                        var lastIndex = path.lastIndexOf('/');
                        var parentPath = path.substring(0, lastIndex);
                        getFileList(parentPath);
                    });
                    li.appendChild(a);
                    fileList.appendChild(li);
                }
                
                // 遍历文件列表并创建列表项
                files.forEach(function(file) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    if (file.type === 'dir') {
                        a.setAttribute('href', '#文件夹');
                        a.setAttribute('data-type', 'dir');
                        a.setAttribute('data-path', file.path);
                        a.addEventListener('click', function() {
                            getFileList(file.path);
                        });
                        // 在文件夹名称加上“(文件夹)”标记
                        a.textContent = file.name + '（文件夹）';
                    } else {
                        //var previewLink = document.createElement('a');
                        //previewLink.setAttribute('href', 'download.php?file=' + encodeURIComponent(file.path.replace(/\//g, '//')) + '&download=true');
                        //previewLink.textContent = '(预览)-';
                        //previewLink.style.color = '#555555';
                        //li.appendChild(previewLink);
                        //previewLink.addEventListener('mouseover', function() {
                        //    this.style.color = '#0046FF'; // 鼠标悬停时将预览链接颜色
                        //});
                        //previewLink.addEventListener('mouseout', function() {
                        //    this.style.color = '#555555'; // 鼠标移出时将预览链接颜色
                        //});
                        a.textContent = file.name;
                        a.setAttribute('href', 'download.php?file=' + encodeURIComponent(file.path.replace(/\//g, '//')) );
                        
                        
                        
                    }
                    li.appendChild(a);
                    fileList.appendChild(li);
                });
            } else {
                console.error('获取文件列表失败：' + xhr.status);
            }
        };
        xhr.send();
    }
    getFileList('');
    
};
