import React from 'react'

import Highlight from 'react-highlight'

import { useTranslation } from 'react-i18next'

import 'highlight.js/styles/atom-one-dark.css'

import './Provably.scss'
//eslint-disable-next-line
export default  () => {


    const { t } = useTranslation(['fair', 'privacy'])


    return (
        <div className="fair">
            <h1 className="fair-header">{t('fair:fair')}</h1>
            <p className="fair-updated">{t('privacy:2')}</p>
            <div className="fair-body">
                <h2>{t('fair:header1')}</h2>
                <p>{t('fair:text1')}</p><br />
                <h2>{t('fair:header2')}</h2>
                <p>{t('fair:text2')}</p>
                <p>{t('fair:text3')}</p><br />
                <p>{t('fair:text4')}</p>
            </div>
            <div className="fair-code">
                <Highlight language="javascript" className='javascript editor'> 
                        {`
const crypto = require('crypto')

//Generate hash of the previous round to check it is valid
function generatePreviousHash(roundHash) {
        return crypto.createHash("sha256").update(roundHash).digest('hex')
}

//Salt the round hash
function saltRoundHash(roundHash, startMoment, roundId) {
        return  crypto.createHmac('sha256', roundHash)
                .update(startMoment.getHours().toString()).update(roundId.toString())
                .digest('hex')
}

//Get the result from the salted hash on:
//Roulette
function getRouletteResultFromSaltedHash(saltedHash) {
        const subHash = saltedHash.toString().substr(0, 8)
        const winningNumber = Math.abs(parseInt(subHash, 16)) % 15
        if (winningNumber === 0) {
                        return "Green"
        } else if (winningNumber <= 7) {
                        return "Red"
        } else {
                        return "Black"
        }
}

//Crash
function getCrashResultFromSaltedHash(saltedHash) {
        const CHANCE_OF_NOT_1X = 0.94
        const h = parseInt(saltedHash.slice(0, 13), 16)
        const e = Math.pow(2, 52)
        const preMultiplier = (100 * e - h) / (e - h)
        const modifiedMultiplier = CHANCE_OF_NOT_1X * preMultiplier
        if (modifiedMultiplier <= 100) {
                return 1.00
        } else {
                return Math.floor(modifiedMultiplier)/100
        }
}

//Streetrace
function getStreetraceResultFromSaltedHash(saltedHash) {
        const subHash = saltedHash.toString().substr(0, 8)
        return Math.abs(parseInt(subHash, 16)) % 4      //0 is 1st, 1 is 2nd, 2 is 3rd, 3 is 4th
}

//Race
function getRaceResultFromSaltedHash(saltedHash) {
        const subHash = saltedHash.toString().substr(0, 8)
        return Math.abs(parseInt(subHash, 16)) % 2          // 0 - firstPlayer, 1 - secondPlayer`}
                </Highlight>
            </div>
        </div>
    )
}