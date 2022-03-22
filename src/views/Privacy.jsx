import React from 'react'

import { useTranslation } from 'react-i18next'

import './Privacy.scss'

//eslint-disable-next-line
export default () => {

    const { t } = useTranslation('privacy')

    return (
        <div className="privacy">
            <h1 className="privacy-header">{t('privacy:1')}</h1>
            <p className="privacy-updated">{t('privacy:2')}</p>
            <p >{t('privacy:3,1')}</p>
            <p >{t('privacy:3,2')} <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/" rel="noreferrer " target="_blank">Privacy Policy Generator</a>.</p>
            <h1>{t('privacy:4')}</h1>
            <h2>{t('privacy:4,1')}</h2>
            <p className='text'>{t('privacy:4,1,1')}</p>
            <h2>{t('privacy:4,2')}</h2>
            <p className='text'>{t('privacy:4,2,1')}</p>
            <ul>
            <li>
            <p ><strong>{t('privacy:4,2,1,1,1')}</strong> {t('privacy:4,2,1,1,2')}</p>
            </li>
            <li>
            <p ><strong>{t('privacy:4,2,1,2,1')}</strong> {t('privacy:4,2,1,2,2')}</p>
            </li>
            <li>
            <p ><strong>{t('privacy:4,2,1,3,1')}</strong> {t('privacy:4,2,1,3,2')}</p>
            </li>
            <li>
            <p ><strong>{t('privacy:4,2,1,4,1')}</strong> {t('privacy:4,2,1,4,2')}</p>
            </li>
            <li>
            <p ><strong>{t('privacy:4,2,1,5,1')}</strong> {t('privacy:4,2,1,5,2')}</p>
            </li>
            <li>
            <p ><strong>{t('privacy:4,2,1,6,1')}</strong> {t('privacy:4,2,1,6,2')}</p>
            </li>
            <li>
            <p ><strong>{t('privacy:4,2,1,7,1')}</strong> {t('privacy:4,2,1,7,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:4,2,1,8,1')}</strong> {t('privacy:4,2,1,8,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:4,2,1,9,1')}</strong> {t('privacy:4,2,1,9,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:4,2,1,10,1')}</strong> {t('privacy:4,2,1,10,2')} <a href="https://csgorace.com" rel="noreferrer external nofollow noopener" target="_blank">https://csgorace.com</a></p>
            </li>
            <li>
            <p><strong>{t('privacy:4,2,1,11,1')}</strong> {t('privacy:4,2,1,11,2')}</p>
            </li>
            </ul>
            <h1>{t('privacy:5')}</h1>
            <h2>{t('privacy:5,1')}</h2>
            <h3>{t('privacy:5,1,1')}</h3>
            <p className='text'>{t('privacy:5,1,1,1')}</p>
            <ul>
            <li>
            <p >{t('privacy:5,1,1,1,1')}</p>
            </li>
            <li>
            <p>{t('privacy:5,1,1,1,2')}</p>
            </li>
            <li>
            <p >{t('privacy:5,1,1,1,3')}</p>
            </li>
            <li>
            <p >{t('privacy:5,1,1,1,4')}</p>
            </li>
            </ul>
            <h3>{t('privacy:5,1,2')}</h3>
            <p className='text'>{t('privacy:5,1,2,1')}</p>
            <p className='text'>{t('privacy:5,1,2,2')}</p>
            <p className='text'>{t('privacy:5,1,2,3')}</p>
            <p className='text'>{t('privacy:5,1,2,4')}</p>
            <h3>{t('privacy:5,1,3')}</h3>
            <p className='text'>{t('privacy:5,1,3,1')}</p>
            <ul>
            <li><strong>{t('privacy:5,1,3,1,1,1')}</strong> {t('privacy:5,1,3,1,1,2')}</li>
            <li><strong>{t('privacy:5,1,3,1,2,1')}</strong> {t('privacy:5,1,3,1,2,2')} <a href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_" rel="noreferrer external nofollow noopener" target="_blank">https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_</a></li>
            <li><strong>{t('privacy:5,1,3,1,3,1')}</strong> {t('privacy:5,1,3,1,3,2')}</li>
            </ul>
            <p className='text'>{t('privacy:5,1,3,2')}</p>
            <p className='text'>{t('privacy:5,1,3,3')}</p>
            <ul>
            <li className='margin'>
            <p className='margin'><strong>{t('privacy:5,1,3,3,1,name')}</strong></p>
            <p className='margin'>{t('privacy:5,1,3,3,1,type')}</p>
            <p className='margin'>{t('privacy:5,1,3,3,1,admin')}</p>
            <p className='margin'>{t('privacy:5,1,3,3,1,purpose')}</p>
            </li>
            <li className='margin'>
            <p className='margin'><strong>{t('privacy:5,1,3,3,2,name')}</strong></p>
            <p className='margin'>{t('privacy:5,1,3,3,2,type')}</p>
            <p className='margin'>{t('privacy:5,1,3,3,2,admin')}</p>
            <p className='margin'>{t('privacy:5,1,3,3,2,purpose')}</p>
            </li>
            <li className='margin'>
            <p className='margin'><strong>{t('privacy:5,1,3,3,3,name')}</strong></p>
            <p className='margin'>{t('privacy:5,1,3,3,3,type')}</p>
            <p className='margin'>{t('privacy:5,1,3,3,3,admin')}</p>
            <p className='margin'>{t('privacy:5,1,3,3,3,purpose')}</p>
            </li>
            </ul>
            <h2>{t('privacy:5,2')}</h2>
            <p className='text'>{t('privacy:5,2,1')}</p>
            <ul>
            <li>
            <p><strong>{t('privacy:5,2,1,1,1')}</strong>{t('privacy:5,2,1,1,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,2,1')}</strong>{t('privacy:5,2,1,2,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,3,1')}</strong>{t('privacy:5,2,1,3,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,4,1')}</strong>{t('privacy:5,2,1,4,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,5,1')}</strong>{t('privacy:5,2,1,5,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,6,1')}</strong>{t('privacy:5,2,1,6,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,7,1')}</strong>{t('privacy:5,2,1,7,2')}</p>
            </li>
            <li>
            <p><strong>{t('privacy:5,2,1,8,1')}</strong>{t('privacy:5,2,1,8,2')}</p>
            </li>
            </ul>
            <p className='text'>{t('privacy:5,2,2')}</p>
            <ul>
            <li><strong>{t('privacy:5,2,2,1,1')}</strong> {t('privacy:5,2,2,1,2')}</li>
            <li><strong>{t('privacy:5,2,2,2,1')}</strong> {t('privacy:5,2,2,2,2')}</li>
            <li><strong>{t('privacy:5,2,2,3,1')}</strong> {t('privacy:5,2,2,3,2')}</li>
            <li><strong>{t('privacy:5,2,2,4,1')}</strong> {t('privacy:5,2,2,4,2')}</li>
            <li><strong>{t('privacy:5,2,2,5,1')}</strong> {t('privacy:5,2,2,5,2')}</li>
            <li><strong>{t('privacy:5,2,2,6,1')}</strong> {t('privacy:5,2,2,6,2')}</li>
            </ul>
            <h2>{t('privacy:5,3')}</h2>
            <p className='text'>{t('privacy:5,3,1')}</p>
            <p className='text'>{t('privacy:5,3,2')}</p>
            <h2>{t('privacy:5,4')}</h2>
            <p className='text'>{t('privacy:5,4,1')}</p>
            <p className='text'>{t('privacy:5,4,2')}</p>
            <p className='text'>{t('privacy:5,4,3')}</p>
            <h2>{t('privacy:5,5')}</h2>
            <h3>{t('privacy:5,5,1')}</h3>
            <p className='text'>{t('privacy:5,5,1,1')}</p>
            <h3>{t('privacy:5,5,2')}</h3>
            <p className='text'>{t('privacy:5,5,2,1')}</p>
            <h3>{t('privacy:5,5,3')}</h3>
            <p className='text'>{t('privacy:5,5,3,1')}</p>
            <ul>
            <li>{t('privacy:5,5,3,1,1')}</li>
            <li>{t('privacy:5,5,3,1,2')}</li>
            <li>{t('privacy:5,5,3,1,3')}</li>
            <li>{t('privacy:5,5,3,1,4')}</li>
            <li>{t('privacy:5,5,3,1,5')}</li>
            </ul>
            <h2>{t('privacy:5,6')}</h2>
            <p className='text'>{t('privacy:5,6,1')}</p>
            <h1>{t('privacy:6')}</h1>
            <p className='text'>{t('privacy:6,1')}</p>
            <p className='text'>{t('privacy:6,2')}</p>
            <h1>{t('privacy:7')}</h1>
            <p className='text'>{t('privacy:7,1')}</p>
            <p className='text'>{t('privacy:7,2')}</p>
            <h1>{t('privacy:8')}</h1>
            <p className='text'>{t('privacy:8,1')}</p>
            <p className='text'>{t('privacy:8,2')}</p>
            <p className='text'>{t('privacy:8,3')}</p>
            <h1>{t('privacy:9')}</h1>
            <p className='text'>{t('privacy:9,1')}</p>
            <ul>
            <li>
            <p>{t('privacy:9,1,1')} <a href="mailto:support@csgorace.com">support@csgorace.com</a></p>
            </li>
            <li>
            <p>{t('privacy:9,1,2')} <a href="https://csgorace.com/faq" rel="noreferrer external nofollow noopener" target="_blank">https://csgorace.com/faq</a></p>
            </li>
            </ul>
        </div>
    )
}

