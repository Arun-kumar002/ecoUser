import React from 'react'
import { ImMail } from 'react-icons/im'
import {MdEmail, MdPrivacyTip} from 'react-icons/md'
import Styles from './_footer.module.css'
const Footer = () => {
  return (
    <section className={Styles.FooterBlock}>
        <article>
            <div>
                <span></span>
                <h3>2022 QTalk</h3>
            </div>
            <div>
                <span className={Styles.icons}><MdPrivacyTip/></span>
                <h3>Privacy</h3>
            </div>
            <div>
                <span className={Styles.icons}><ImMail/></span>
            <h3>Enquiry@Qtalk.com</h3>
            </div>
        </article>
    </section>
  )
}

export default Footer