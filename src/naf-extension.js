import * as deepcopy from 'deepcopy';
import { EventBus } from './utils/event-bus';
import { SpatialAudioExtension } from "./index.esm.js";

export const spatialAudioExtension = new SpatialAudioExtension();
const remotes = {};
const self = {
  r: new THREE.Vector3(0, 0, 0), o: new THREE.Vector3(0, 0, 0), r: new THREE.Vector3(0, 0, 0), r: new THREE.Vector3(0, 0, 0)
};

EventBus.listen('user-published', ({ user, processor }) => {
  if (!remotes[user.uid]) {
    remotes[user.uid] = {
      userid: user.uid,
      position: {
        r: new THREE.Vector3(0, 0, 0),
        o: new THREE.Vector3(0, 0, 0),
      },
      user,
      processor,
    }
  }
});

EventBus.listen('user-unpublished', (user) => {
  delete remotes[user.uid];
})

export const addSelfPositionInfo = (name, v3) => {
  if (v3) {
    self[name] = new THREE.Vector3(v3.x, v3.y, v3.z);
  } else {
    self[name] = self[name];
  }
  updateSelfPosition();
}

export const addRemotePositionInfo = (userid, name, v3) => {
  if (!remotes[userid]) return;

  if (v3) {
    remotes[userid].position[name] = new THREE.Vector3(v3.x, v3.y, v3.z);
  } else {
    remotes[userid].position[name] = remotes[userid].position[name];
  }
}

export const getSelfPosition = () => deepcopy(self);
export const getRemotePositionById = (userid) => deepcopy(remotes[userid] || null);

export const updateSelfPosition = () => {
  const { r, o, i, s } = self;
  const result = spatialAudioExtension.updateSelfPosition(r, o, i, s);
}

export const updateRemotePosition = (userid) => {
  const user = remotes[userid];
  if (!user) return;
  const { r, o } = user.position;
  const result = user.processor.updateRemotePosition(r, o);
}