export let info, config;
export const getInfo = async _ => {
    let res = await fetch("/info");
    info = await res.json();
    config = info.clientConfig;
};