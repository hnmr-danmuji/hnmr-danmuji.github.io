const messageContainer = document.getElementById('danmaku-area');

function code_to_str(codes) {
    return codes.map((item) => String.fromCharCode(item)).join('')
}

let message_convert = {}
message_convert[code_to_str([26217, 19978, 22909])] = '<img src="asserts/icons/01.png" />'
message_convert['awsl'] = '<img src="asserts/icons/02.png" />'
message_convert[code_to_str([29233, 24515])] = '<img src="asserts/icons/03.png" />'
message_convert['恭喜'] = '<img src="asserts/icons/04.png" />'
message_convert['打call'] = '<img src="asserts/icons/05.png" />'
message_convert['suki'] = '<img src="asserts/icons/06.png" />'
message_convert['大笑'] = '<img src="asserts/icons/07.png" />'
message_convert['天才'] = '<img src="asserts/icons/08.png" />'
message_convert['来了'] = '<img src="asserts/icons/09.png" />'
message_convert['牛牛牛'] = '<img src="asserts/icons/10.png" />'
message_convert['4分'] = '<img src="asserts/icons/11.png" />'
message_convert['zzz'] = '<img src="asserts/icons/13.png" />'
message_convert['世界名画'] = '<img src="asserts/icons/14.png" />'
message_convert['kksk'] = '<img src="asserts/icons/15.png" />'
message_convert['5kg'] = '<img src="asserts/icons/16.png" />'
message_convert['単推'] = '<img src="asserts/icons/18.png" />'
message_convert['yyds'] = '<img src="asserts/icons/19.png" />'
message_convert['精神支柱'] = '<img src="asserts/icons/20.png" />'
message_convert['[花丸晴琉_mua]'] = '<img src="asserts/icons/s01.png" />'
message_convert['[花丸晴琉_wink]'] = '<img src="asserts/icons/s02.png" />'
message_convert['[花丸晴琉_啊咧]'] = '<img src="asserts/icons/s03.png" />'
message_convert['[花丸晴琉_大笑]'] = '<img src="asserts/icons/s04.png" />'
message_convert['[花丸晴琉_呆住]'] = '<img src="asserts/icons/s05.png" />'
message_convert['[花丸晴琉_对不起]'] = '<img src="asserts/icons/s06.png" />'
message_convert['[花丸晴琉_好耶]'] = '<img src="asserts/icons/s07.png" />'
message_convert['[花丸晴琉_挥手]'] = '<img src="asserts/icons/s08.png" />'
message_convert['[花丸晴琉_惊慌]'] = '<img src="asserts/icons/s09.png" />'
message_convert['[花丸晴琉_泪目]'] = '<img src="asserts/icons/s10.png" />'
message_convert['[花丸晴琉_丧]'] = '<img src="asserts/icons/s11.png" />'
message_convert['[花丸晴琉_生气]'] = '<img src="asserts/icons/s12.png" />'
message_convert['[花丸晴琉_晚安]'] = '<img src="asserts/icons/s13.png" />'
message_convert['[花丸晴琉_无语]'] = '<img src="asserts/icons/s14.png" />'
message_convert['[花丸晴琉_喜欢]'] = '<img src="asserts/icons/s15.png" />'
message_convert['[花丸晴琉_邪恶]'] = '<img src="asserts/icons/s16.png" />'
message_convert['[花丸晴琉_疑惑]'] = '<img src="asserts/icons/s17.png" />'
message_convert['[花丸晴琉_嘤嘤]'] = '<img src="asserts/icons/s18.png" />'
message_convert['[花丸晴琉_赞]'] = '<img src="asserts/icons/s19.png" />'
message_convert['[花丸晴琉_早安]'] = '<img src="asserts/icons/s20.png" />'

let is_last_sc = false;

function is_filtered(message) {
    return message.startsWith('【♪') || message.startsWith('翻译【')
}

function add_message(message, metal) {
    //Ignore the filtered message.
    if(is_filtered(message)) {
        return;
    }
    //Search the message.
    if(message in message_convert) {
        message = message_convert[message]
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = message;
    if(metal[2] === "花丸晴琉Official") {
        messageElement.insertAdjacentHTML("afterbegin", '<div class="metal"><div class="metal-label">花丸家</div><div class="metal-level">'+metal[0].toString()+'</div></div>')
    }
    if(messageContainer.children.length > window.innerHeight / 10) {
        messageContainer.removeChild(messageContainer.firstElementChild)
    }
    messageContainer.appendChild(messageElement);
    is_last_sc = false;
}

function bilibili_pack(username, sc_price, sc_time, content, content_jp) {
    let sc_content = content;
    if(content_jp.length > 0) {
        sc_content += '<br><br>自動翻訳：' + content_jp;
    }
    //Construct the SC price text.
    let sc_price_text = "RMB￥" + String(sc_price);
    //Based on the price decide the level.
    let sc_level = 'sc-0';
    if(sc_price >= 2000) {
        sc_level = 'sc-6';
    } else if(sc_price >= 1000) {
        sc_level = 'sc-5';
    } else if(sc_price >= 500) {
        sc_level = 'sc-4';
    } else if(sc_price >= 100) {
        sc_level = 'sc-3';
    } else if(sc_price >= 50) {
        sc_level = 'sc-2';
    } else if(sc_price >= 30) {
        sc_level = 'sc-1';
    }
    return {uname: username, price: sc_price_text, content: sc_content, level: sc_level}
}

function sc_date_to_str(cn_timestamp) {
    let target_time = new Date(cn_timestamp * 1000);
    // Format the time.
    function formatNumber (n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }

    return formatNumber(target_time.getFullYear()) + '-' +
        formatNumber(target_time.getMonth() + 1) + '-' +
        formatNumber(target_time.getDate()) + ' ' +
        formatNumber(target_time.getHours()) + ':' +
        formatNumber(target_time.getMinutes()) + ':' +
        formatNumber(target_time.getSeconds());
}

function sc_create_message(name, price_text, content, color_level) {
    // Construct the content body.
    let html_content = (content.length === 0) ? '' : ['<div class="sc-content">', content, '</div>'].join('');
    // Construct the div body.
    return [
        '<div class="sc-message '+color_level+'">',
        '<div class="sc-header">',
        '<div class="sc-name">'+name+'</div>',
        '<div class="sc-amount">'+price_text+'</div>',
        '</div>',
        html_content,
        '</div>'].join('');
}

let last_sc = {n: '', p: '', l: '', c: ''}

function sc_insert(name, price_text, content, color_level) {
    // Check is last record superchat?
    if(is_last_sc) {
        // Might we have to just update the last record.
        if(last_sc.n === name && last_sc.p === price_text && last_sc.l === color_level) {
            // Seem to be the one we found.
            if (last_sc.c.length < content.length) {
                //Need to update the SC.
                last_sc.c = content;
                //Get the last item from body.
                messageContainer.lastElementChild.children[1].innerHTML = content;
                return;
            }
        }
    }
    // Insert the SC content to the beginning of the div.
    if(messageContainer.children.length > window.innerHeight / 10) {
        messageContainer.removeChild(messageContainer.firstElementChild)
    }
    messageContainer.insertAdjacentHTML("beforeend", sc_create_message(name, price_text, content, color_level));
    last_sc = {n: name, p: price_text, l: color_level, c: content}
    is_last_sc = true;
}

function member_create_message(name, level) {
    // Construct the content body.
    let html_content = ['<div class="sc-content">欢迎&nbsp' + name + '&nbsp加入花丸晴琉的' + level + '！</div>'].join('');
    // Construct the div body.
    return [
        '<div class="sc-message sc-member">',
        '<div class="sc-header">',
        '<div class="sc-name">欢迎新'+level+'</div>',
        '</div>',
        html_content,
        '</div>'].join('');
}

function member_insert(name, member_level) {
    // Insert the SC content to the beginning of the div.
    if(messageContainer.children.length > window.innerHeight / 10) {
        messageContainer.removeChild(messageContainer.firstElementChild)
    }
    messageContainer.insertAdjacentHTML("beforeend", member_create_message(name, member_level));
}

function wss_bilibili(room_id) {
    let ws_heartbeat;
    let ws = new WebSocket("wss://broadcastlv.chat.bilibili.com:443/sub");
    ws.onopen = function(e) {
        //When communication start, send the certification message.
        let certification = { "uid": 0, "roomid": room_id, "protover": 3, "platform": "web", "type": 2, "key": ""};

        function getCertification(json) {
            let encoder = new TextEncoder();
            let jsonView = encoder.encode(json);
            let buff = new ArrayBuffer(jsonView.byteLength + 16);
            let view = new DataView(buff);
            view.setUint32(0, jsonView.byteLength + 16);
            view.setUint16(4, 16); //Header length
            view.setUint16(6, 1); //Protocol
            view.setUint32(8, 7); //Enter the chat room
            view.setUint32(12, 1); //Fixed 1
            for(let r = 0; r < jsonView.byteLength; r++){
                view.setUint8(16 + r, jsonView[r]);
            }
            return buff;
        }
        //Start certification.
        ws.send(getCertification(JSON.stringify(certification)));
        console.log('Listening https://live.bilibili.com/' + room_id);
        //Set heartbeat package timer.
        ws_heartbeat = setInterval( function() {
            let buff = new ArrayBuffer(16);
            let i = new DataView(buff);
            i.setUint32(0, 0);
            i.setUint16(4, 16);
            i.setUint16(6, 1);
            i.setUint32(8, 2);
            i.setUint32(12, 1);
            ws.send(buff);
        }, 30000); // = 30seconds.
    };

    ws.onmessage = function(e) {
        // When receive package, extract the data.
        let blob = e.data;
        // Parse the data.
        let reader = new FileReader();
        reader.onload = function(e) {
            let buff = e.target.result;
            let decoder = new TextDecoder();
            let view = new DataView(buff);
            let offset = 0, packet = {}, result = [];
            while (offset < buff.byteLength) {
                const packetLen = view.getUint32(offset);
                const headLen = view.getUint16(offset + 4);
                const packetVer = view.getUint16(offset + 6);
                const packetType = view.getUint32(offset + 8);
                const num = view.getUint32(12);
                if (packetVer === 3) {
                    // Decompress the data.
                    let BrotliDecode = makeBrotliDecode();
                    let buffFromBr = BrotliDecode(new Uint8Array(buff, offset + headLen, packetLen - headLen));
                    let buff_view = new DataView(buffFromBr.buffer);
                    let offset_Ver3 = 0;
                    while (offset_Ver3 < buffFromBr.byteLength) {
                        //Parse the header.
                        packet.Len = buff_view.getUint32(offset_Ver3);
                        packet.HeadLen = buff_view.getUint16(offset_Ver3 + 4);
                        packet.Ver = buff_view.getUint16(offset_Ver3 + 6);
                        packet.Type = buff_view.getUint32(offset_Ver3 + 8);
                        packet.Num = buff_view.getUint32(12);
                        //Decode the body.
                        let dataArray = new Uint8Array(buffFromBr.buffer, offset_Ver3 + packet.HeadLen, packet.Len - packet.HeadLen);
                        packet.body = decoder.decode(dataArray);
                        //Save the packet, jump to next pos.
                        result.push(JSON.stringify(packet));
                        offset_Ver3 += packet.Len;
                    }
                } else {
                    packet.Len = packetLen;
                    packet.HeadLen = headLen;
                    packet.Ver = packetVer;
                    packet.Type = packetType;
                    packet.Num = num;
                    let dataArray = new Uint8Array(buff, offset + headLen, packetLen - headLen);
                    if (packetType === 3) {
                        packet.body = (new DataView(buff, offset + headLen, packetLen - headLen)).getUint32(0);
                    } else {
                        packet.body = decoder.decode(dataArray);
                    }
                    result.push(JSON.stringify(packet));
                }
                offset += packetLen;
            }
            // Find the SC information in the result.
            for(let i=0; i<result.length; i++) {
                let json = JSON.parse(result[i]);
                if (json.Type === 5) {
                    // Parse the information.
                    let data_pack = JSON.parse(json.body);
                    const data_cmd = data_pack.cmd;
                    if(data_cmd === "DANMU_MSG") {
                        // Extract the content and user id.
                        let pack_info = data_pack.info
                        add_message(pack_info[1], pack_info[3]);
                    } else if (data_cmd === "SUPER_CHAT_MESSAGE") {
                        const sc_info = data_pack.data;
                        //Construct the data as expected.
                        const msg_pack = bilibili_pack(sc_info.user_info.uname, sc_info.price, sc_info.start_time, sc_info.message, sc_info.message_trans);
                        sc_insert(msg_pack.uname, msg_pack.price, msg_pack.content, msg_pack.level);
                    } else if (data_cmd === "GUARD_BUY") {
                        member_insert(data_pack.data.username, data_pack.data.gift_name);
                    } else {
                        // console.log(data_pack)
                    }
                    // Bilibili has two types of SC info.
                    // But it might come from only one payment.
                    // The second one seems to create a translation,
                    // however the first one also contains a translation field.
                    // Why???

                    // else if(data_cmd === "SUPER_CHAT_MESSAGE_JPN") {
                    //     const sc_info = data_pack.data;
                    //     const msg_pack = bilibili_pack(sc_info.user_info.uname, sc_info.price, sc_info.start_time, sc_info.message, sc_info.message_jpn);
                    //     //Insert the content.
                    //     sc_insert(msg_pack.uname, msg_pack.price, msg_pack.content, msg_pack.level);
                    // }
                }
            }
        };
        //Start reading buffer.
        reader.readAsArrayBuffer(blob);
    }

    ws.onclose = function(e){
        if (ws_heartbeat != null){
            clearInterval(ws_heartbeat);    //Stop heartbeat.
        }
        console.log('Connection closed, retry after 1 seconds...');
        setTimeout(function() {wss_bilibili(room_id)}, 1000);    //Retry after 1 seconds.
    }

    ws.onerror = function(e){
        //TODO: Show the error in the system message.
        console.log(e);
    }
}
