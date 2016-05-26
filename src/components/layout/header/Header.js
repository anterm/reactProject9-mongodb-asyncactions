import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './header.css'

export default class Header extends Component {
	render() {
		return <div className={styles.block}>
			<div className={styles.block_wrapper}>
				<Link className={styles.link} to="/">
					<span className={styles.icon_home}></span>
					Главная
				</Link>
				<Link className={styles.link} to="/books">
					<span className={styles.icon_books}></span>
					Книги
				</Link>
				<Link className={styles.link} to="/about">
					<span className={styles.icon_about}></span>
					О нас
				</Link>
			</div>
		</div>
	}
}