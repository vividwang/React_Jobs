/**
 * Created by w on 2017/12/6.
 */
//注册成功后返回一个redirectTo
export function getRedirectPath({type, avatar}) {
    let url = (type === 'boss' ? '/boss' : '/genius');

    if (!avatar){
        url += 'info';
    }
    return url;
}

export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_');
}