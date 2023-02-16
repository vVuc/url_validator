function extraiLinks(arrLinks) {
    return arrLinks.map(obj => Object.values(obj).join());
}

async function checaStatus(arrUrls) {
    const arrStatus = await Promise.all(
        arrUrls.map(async arr => {
            try {
                const response = await fetch(arr);
                return `${response.status} - ${response.statusText}`;

            } catch (error) {
                return manejaErros(error)
            }
        })
    );
    return arrStatus;
}

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
       return `O Link ${erro.cause.hostname} não existe`;
    } else
    return 'Algo deu errado';
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((obj, i) => ({
        ...obj,
        'statusCode': status[i]
    }))

}