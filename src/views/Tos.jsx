import React from 'react'

import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import './Tos.scss'

export default function TermsOfService () {

    const { t } = useTranslation(['tos', 'privacy'])

    const lang = useSelector(state => state.app.user.language)

    return (
        <div className="tos">
            <h1 className="tos-header">{t('tos:tos')}</h1>
            <p className="tos-updated">{t('privacy:2')}</p>
            <div className="tos-body">
                <div className="tos-body-header">{t("tos:list.1")}</div>
                <div className="tos-body-point"><span>1.1.</span> {t("tos:list.1,1")}</div>
                <div className="tos-body-point"><span>1.2.</span> {t("tos:list.1,2")}</div>
                <div className="tos-body-point"><span>1.3.</span> {t("tos:list.1,3")}</div>
                <div className="tos-body-point"><span>1.4.</span> {t("tos:list.1,4")}</div>
                <div className="tos-body-point"><span>1.5.</span> {t("tos:list.1,5")} <a href="mailto:support@csgorace.com">support@csgorace.com</a></div>
                <div className="tos-body-point"></div>
                <div className="tos-body-header">{t("tos:list.2")}</div>
                <div className="tos-body-point"><span>2.1.</span> {t("tos:list.2,1")}</div>
                <div className="tos-body-point"><span>2.2.</span> {t("tos:list.2,2")}</div>
                <div className="tos-body-point"><span>2.3.</span> {t("tos:list.2,3")}</div>
                <div className="tos-body-point"><span>2.4.</span> {t("tos:list.2,4")}</div>
                <div className="tos-body-point"><span>2.5.</span> {t("tos:list.2,5")}</div>
                <div className="tos-body-point"><span>2.6.</span> {t("tos:list.2,6")}</div>
                <div className="tos-body-point"><span>2.7.</span> {t("tos:list.2,7")}</div>
                <div className="tos-body-header">{t("tos:list.3")}</div>
                <div className="tos-body-point"><span>3.1.</span> {t("tos:list.3,1")}</div>
                <div className="tos-body-point"><span>3.2.</span> {t("tos:list.3,2")}</div>
                <div className="tos-body-point"><span>3.3.</span> {t("tos:list.3,3")}</div>
                <div className="tos-body-point"><span>3.4.</span> {t("tos:list.3,4")}</div>
                <div className="tos-body-point"><span>3.5.</span> {t("tos:list.3,5")}</div>
                <div className="tos-body-point"><span>3.6.</span> {t("tos:list.3,6")}</div>
                <div className="tos-body-point"><span>3.7.</span> {t("tos:list.3,7")}</div>
                <div className="tos-body-point"><span>3.8.</span> {t("tos:list.3,8")}</div>
                <div className="tos-body-header">{t("tos:list.4")}</div>
                <div className="tos-body-point"><span>4.1.</span> {t("tos:list.4,1")}</div>
                <div className="tos-body-point"><span>4.2.</span> {t("tos:list.4,2")}</div>
                <div className="tos-body-point"><span>4.3.</span> {t("tos:list.4,3")}
                    <div className="tos-body-point">
                    <span>4.3.1.</span> {t("tos:list.4,3,1")}
                            <ul className="tos-body-point-list">
                                <li>{t("tos:list.4,3,1,1")}</li>
                                <li>{t("tos:list.4,3,1,2")}</li>
                                <li>{t("tos:list.4,3,1,3")}</li>
                                <li>{t("tos:list.4,3,1,4")}</li>
                                <li>{t("tos:list.4,3,1,5")}</li>
                                <li>{t("tos:list.4,3,1,6")}</li>
                                <li>{t("tos:list.4,3,1,7")}</li>
                            </ul>
                    </div>
                    <div className="tos-body-point"><span>4.3.2.</span> {t("tos:list.4,3,2")}</div>
                    <div className="tos-body-point"><span>4.3.3.</span> {t("tos:list.4,3,3")}</div>
                    <div className="tos-body-point"><span>4.3.4.</span> {t("tos:list.4,3,4")}</div>
                    <div className="tos-body-point"><span>4.3.5.</span> {t("tos:list.4,3,5")}</div>
                    <div className="tos-body-point"><span>4.3.6.</span> {t("tos:list.4,3,6")}</div>
                    <div className="tos-body-point"><span>4.3.7.</span> {t("tos:list.4,3,7")}</div>
                    <div className="tos-body-point"><span>4.3.8.</span> {t("tos:list.4,3,8")}</div>
                </div>
                <div className="tos-body-point"><span>4.4.</span> {t("tos:list.4,4")}</div>
                <div className="tos-body-point"><span>4.5.</span> {t("tos:list.4,5")}
                    <div className="tos-body-point"><span>4.5.1.</span> {t("tos:list.4,5,1")}</div>
                    <div className="tos-body-point"><span>4.5.2.</span> {t("tos:list.4,5,2")}</div>
                    <div className="tos-body-point"><span>4.5.3.</span> {t("tos:list.4,5,3")}</div>
                    <div className="tos-body-point"><span>4.5.4.</span> {t("tos:list.4,5,4")}</div>
                    <div className="tos-body-point"><span>4.5.5.</span> {t("tos:list.4,5,5")}</div>
                    <div className="tos-body-point"><span>4.5.6.</span> {t("tos:list.4,5,6")}</div>
                    <div className="tos-body-point"><span>4.5.7.</span> {t("tos:list.4,5,7")}</div>
                    <div className="tos-body-point"><span>4.5.8.</span> {t("tos:list.4,5,8")}</div>
                    <div className="tos-body-point"><span>4.5.9.</span> {t("tos:list.4,5,9")}</div>
                </div>
                <div className="tos-body-header">{t("tos:list.5")}</div>
                <div className="tos-body-point"><span>5.1.</span> {t("tos:list.5,1")}</div>
                <div className="tos-body-point"><span>5.2.</span> {t("tos:list.5,2")}
                    <ul className="tos-body-point-list">
                        <li>{t("tos:list.5,2,1")}</li>
                        <li>{t("tos:list.5,2,2")}</li>
                    </ul>
                </div>
                <div className="tos-body-point"><span>5.3.</span> {t("tos:list.5,3")}</div>
                <div className="tos-body-point"><span>5.4.</span> {t("tos:list.5,4")}</div>
                <div className="tos-body-header">{t("tos:list.6")}</div>
                <div className="tos-body-point"><span>6.1.</span> {t("tos:list.6,1")}
                    <ul className="tos-body-point-list">
                        <li>{t("tos:list.6,1,1")}</li>
                        <li>{t("tos:list.6,1,2")}</li>
                        <li>{t("tos:list.6,1,3")}</li>
                        <li>{t("tos:list.6,1,4")}
                            <br />
                            <br />
                            {t("tos:list.6,1,5")}
                        </li>
                    </ul>
                </div>
                <div className="tos-body-header">{t("tos:list.7")}</div>
                <div className="tos-body-point"><span>7.1.</span> {t("tos:list.7,1")}</div>
                <div className="tos-body-point"><span>7.2.</span> {t("tos:list.7,2")} <a href="mailto:support@csgorace.com">support@csgorace.com</a> {t("tos:list.7,2,1")}</div>
                <div className="tos-body-point"><span>7.3.</span> {t("tos:list.7,3")}</div>
                <div className="tos-body-point"></div>
                <div className="tos-body-header">{t("tos:list.8")}</div>
                <div className="tos-body-point"><span>8.1.</span> {t("tos:list.8,1")}</div>
                <div className="tos-body-point"><span>8.2.</span> {t("tos:list.8,2")}
                    <ul className="tos-body-point-list">
                        <li>{t("tos:list.8,2,1")}</li>
                        <li>{t("tos:list.8,2,2")}</li>
                        <li>{t("tos:list.8,2,3")}</li>
                        <li>{t("tos:list.8,2,4")}</li>
                        <li>{t("tos:list.8,2,5")}</li>
                    </ul>

                </div>
                <div className="tos-body-point"><span>8.3.</span> {t("tos:list.8,3")}
                    <ul className="tos-body-point-list">
                        <li>{t("tos:list.8,3,1")}</li>
                        <li>{t("tos:list.8,3,2")}</li>
                        <li>{t("tos:list.8,3,3")}</li>
                    </ul>
                </div>
                <div className="tos-body-point"><span>8.4.</span> {t("tos:list.8,4")}</div>
                <div className="tos-body-point"><span>8.5.</span> {t("tos:list.8,5")} <a href="mailto:admin@csgorace.com">admin@csgorace.com</a> .</div>
                <div className="tos-body-point"><span>8.6.</span> {t("tos:list.8,6")}</div>
                <div className="tos-body-header">{t("tos:list.9")}</div>
                <div className="tos-body-point"><span>9.1.</span> {t("tos:list.9,1")}</div>
                <div className="tos-body-header">{t("tos:list.10")}</div>
                <div className="tos-body-point"><span>10.1.</span> {t("tos:list.10,1")}</div>
                <div className="tos-body-point"><span>10.2.</span> {t("tos:list.10,2")}</div>
                <div className="tos-body-point"><span>10.3.</span> {t("tos:list.10,3")}</div>
                <div className="tos-body-point"><span>10.4.</span> {t("tos:list.10,4")}
                    <ul className="tos-body-point-list">
                        <li>{t("tos:list.10,4,1")}</li>
                        <li>{t("tos:list.10,4,2")}</li>
                    </ul>
                </div>
                <div className="tos-body-point"><span>10.5.</span> {t("tos:list.10,5")}</div>
                <div className="tos-body-point"><span>10.6.</span> {t("tos:list.10,6")}</div>
                <div className="tos-body-point"><span>10.7.</span> {t("tos:list.10,7")}
                    <ul className="tos-body-point-list">
                        <li>{t("tos:list.10,7,1")}</li>
                        <li>{t("tos:list.10,7,2")}</li>
                        <li>{t("tos:list.10,7,3")}</li>
                        <li>{t("tos:list.10,7,4")}</li>
                        <li>{t("tos:list.10,7,5")}</li>
                    </ul>
                </div>
                <div className="tos-body-point"><span>10.8.</span> {t("tos:list.10,8")}</div>
                <div className="tos-body-point"><span>10.9.</span> {t("tos:list.10,9")}</div>


                <div className="tos-body-header">{t("tos:list.11")}</div>
                <div className="tos-body-point"><span>11.1.</span> {t("tos:list.11,1")}</div>
                <div className="tos-body-point"><span>11.2.</span> {t("tos:list.11,2")}</div>
                <div className="tos-body-point"><span>11.3.</span> {t("tos:list.11,3")}</div>
                <div className="tos-body-point"><span>11.4.</span> {t("tos:list.11,4")}</div>
                <div className="tos-body-point"><span>11.5.</span> {t("tos:list.11,5")}</div>
                <div className="tos-body-point"><span>11.6.</span> {t("tos:list.11,6")}<a href="mailto:support@csgorace.com">support@csgorace.com</a>.</div>
                <div className="tos-body-header">{t("tos:list.12")}</div>
                <div className="tos-body-point"><span>12.1.</span> {t("tos:list.12,1")}</div>
                <div className="tos-body-point"><span>12.2.</span> {t("tos:list.12,2")}</div>
                { lang === 'ru' ? (
                    <>
                        <div className="tos-body-header">{t("tos:list.13")}</div>
                        <div className="tos-body-point"><span>13.1.</span> {t("tos:list.13,1")}</div>
                        <div className="tos-body-point"><span>13.2.</span> {t("tos:list.13,2")}</div>
                        <div className="tos-body-point"><span>13.3.</span> {t("tos:list.13,3")}</div>
                        <div className="tos-body-point"><span>13.4.</span> {t("tos:list.13,4")}</div>
                    </>
                ) : ''}

            </div>
        </div>
    )
}