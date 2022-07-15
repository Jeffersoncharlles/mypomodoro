export const uid = () => {
    const head = Date.now().toString(36)
    const tail = String(Math.random().toString(36).slice(2))

    return head + tail
}

export const uuid = () => {
    let d = new Date().getTime() // Timestamp
    let d2 =
        (typeof performance !== 'undefined' &&
            performance.now &&
            performance.now() * 1000) ||
        0 // Tempo em microssegundos desde o carregamento da página ou 0 se não for compatível
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 // número aleatório entre 0 e 16
        if (d > 0) {
            // Use timestamp ate acabar
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
        } else {
            // Use microssegundos desde o carregamento da página, se suportado
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
}

export const uuidV1 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
