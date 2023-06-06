export const formatIP = (ip: string) =>{
    const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
    const match = ipv4Regex.exec(ip);
    if (match) {
        return match[1]
    }
    return ip
}