import request from '../utils/fetch';

export default async function selfAuthInsert(updateHandle) {
    let userData;
    const qs = new URLSearchParams(location.search);
    if (qs.get("token")) {
        window.localStorage.setItem('custom_token', qs.get("token"));
    }
    let custom_token = window.localStorage.getItem('custom_token');
    try {
        userData = await request.get(`/api/user/detail?token=${custom_token}`, {
            authorization: `bearer ${custom_token}`,
        });
    } catch (err) {
        window.location.href = 'https://home.metaio.cc/#/login';
    }
    const { avatar_sid, name, uid } = userData;
    const updateData = {
        // ...(this.state || {}),
        // ...(this.state.profile || {}),
        activity: { hasChangedName: true, hasAcceptedProfile: true },
        profile: { avatarId: avatar_sid, displayName: name, uid },
        credentials: {
            email: 'nanwu5522@gmail.com',
            token: custom_token,
        },
        uid
    };

    updateHandle(updateData);
}