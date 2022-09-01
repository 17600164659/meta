// import AgoraRTC from "./AgoraRTC_N-4.13.0";
import AgoraRTC from "./AgoraRtc";
import request from './utils/fetch';
import { EventBus } from './utils/event-bus';
import { spatialAudioExtension } from './naf-extension'
export let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
    extension: spatialAudioExtension,
};

let agoraOptions = {
    appId: "5514ba1b7cfa48aea19c5a06a5861291",
    channel: null,
    token: null,
    uid: null,
};

let divices;

window.metaRtc = rtc;

// LOG: 检查设备
export async function checkAndGetDevices() {
    const devices = await AgoraRTC.getDevices();
    const input = [];
    const output = [];
    const video = [];
    devices.forEach(item => {
        if (item.kind === "audioinput") input.push(item);
        if (item.kind === "audiooutput") output.push(item);
        if (item.kind === "videoinput") video.push(item);
    })
    divices = { input, output, video, all: devices };
    // window.APP.mediaDevicesManager = {};
    window.APP.mediaDevicesManager._videoDevices = divices.video;
    window.APP.mediaDevicesManager._micDevices = divices.input;
    window.APP.mediaDevicesManager._outDevices = divices.output;
}

export async function createAgora() {
    // 开启日志上传功能
    // AgoraRTC.enableLogUpload();
    // 将日志输出级别设置为 INFO
    // AgoraRTC.setLogLevel(1);
    if (!agoraOptions.token) {
        // const roomDetail = await request.get(`/api/room/detail?sid=${window.APP.hub.hub_id}`);
        // window.RoomDetail = roomDetail;
        agoraOptions.token = window.RoomDetail.user.agora_token;
        agoraOptions.channel = window.RoomDetail.user.channel_name;
        agoraOptions.uid = window.RoomDetail.user.uid;
        // window.APP.roomDetail = roomDetail;
    }

    await checkAndGetDevices();
    rtc.client = await AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    bindAgoraEvents();
    await AgoraRTC.registerExtensions([spatialAudioExtension]);
    // 加入房间
    await rtc.client.join(
        agoraOptions.appId,
        agoraOptions.channel,
        // ShiQuSceneId,
        agoraOptions.token,
        // "0065514ba1b7cfa48aea19c5a06a5861291IADF55Njto9wVzULkwKp4VS04SUKTiN1pB1O+owp+34ZdiIkw3IAAAAAEACv0GpjQBThYgEAAQBAFOFi",
        agoraOptions.uid
    );
    // 创建本地音频推流
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // 开始向服务器推流
    await rtc.client.publish([rtc.localAudioTrack]);
    // 创建完成
    console.log("publish success!");
    return rtc;
}

// LOG: 订阅其它设备的音视频流
async function bindAgoraEvents() {
    rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
            // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
            const remoteAudioTrack = user.audioTrack;
            // Play the remote audio track. No need to pass any DOM element.
            // updateSelfPosition
            // const processor = spatialAudioExtension.createProcessor();
            // remoteAudioTrack.pipe(processor).pipe(remoteAudioTrack.processorDestination);
            remoteAudioTrack.play();
            EventBus.trigger('user-published', {
                user,
                // processor,
            })
        }

        // // Listen for the "user-unpublished" event
        rtc.client.on("user-unpublished", user => {
            EventBus.trigger('user-unpublished', {
                user,
            })
        });
    });
}
