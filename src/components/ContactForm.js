import React, { Component } from "react";
import style from "./ContactForm.module.css";
import faker from "faker";
//import axios from "axios";

export default class App extends Component {
	state = {
		name: "",
		number: "",
		text: "",
		email: "",
		file: {},
		loader: false,
		formStatus: false,
		errors: null,
	};

	handleFake = () => {
		const fakeName = faker.name.firstName();
		const fakeNumber = faker.phone.phoneNumberFormat();
		const fakeText = faker.lorem.paragraph();
		const fakeEmail = faker.internet.email();

		this.setState({
			name: fakeName,
			number: fakeNumber,
			text: fakeText,
			email: fakeEmail,
		});
	};

	handleChange = ({ target }) => {
		const { name, value } = target;
		this.setState({ [name]: value });
	};

	handleSubmit = (evt) => {
		evt.preventDefault();

		//Формирует фаил для отправки
		let formData = new FormData();
		formData.append("file", this.state.file);
		formData.append("user_name", this.state.name);
		formData.append("user_phone", this.state.number);
		formData.append("user_email", this.state.email);
		formData.append("user_text", this.state.text);

		this.setState({
			loader: true,
		});

		//Работает проблема с передачей this.setState
		// axios({
		// 	method: "post",
		// 	url: "mail.php",
		// 	data: formData,
		// })
		// 	.then(function (response) {
		// 		console.log(response.data);
		// 	})
		// 	.catch(function (error) {
		// 		console.log("Ошибка!", error);
		// 	});

		//------------
		//Работает
		// let xhr = new XMLHttpRequest();

		// xhr.open("POST", "mail.php", true);
		// console.log(xhr);

		// //Send the proper header information along with the request
		// // xhr.setRequestHeader(
		// // 	"Content-Type",
		// // 	"application/x-www-form-urlencoded"
		// // );

		// xhr.onreadystatechange = function () {
		// 	if (
		// 		this.readyState === XMLHttpRequest.DONE &&
		// 		this.status === 200
		// 	) {
		// 		// Request finished. Do processing here.
		// 		console.log("I`ts ok");
		// 	}
		// };
		// xhr.send(formData);
		//----------
		//Работает
		fetch("mail.php", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				//console.log(response);

				this.setState({
					loader: false,
				});
				if (response.ok) {
					return response;
				} else {
					throw new Error(response.status, response.statusText);
				}
			})
			.then(() => {
				this.animateStatus();
			})
			.catch((error) => {
				console.error(error);
				this.setState({
					formStatus: false,
				});
			});
		//----------
	};

	animateStatus = () => {
		this.setState({
			formStatus: true,
		});

		setTimeout(() => {
			this.setState({
				formStatus: false,
			});
		}, 2000);
	};

	render() {
		const {
			name,
			number,
			text,
			email,
			formStatus,
			loader,
			errors,
		} = this.state;
		return (
			<>
				<form onSubmit={this.handleSubmit} className={style.form}>
					<label className={style.title}>
						Name
						<input
							className={style.formInput}
							value={name}
							type="text"
							placeholder="Enter login"
							onChange={this.handleChange}
							name="name"
						/>
						{errors && <p>Ups error</p>}
					</label>

					<label className={style.title}>
						Number
						<input
							className={style.formInput}
							value={number}
							type="text"
							placeholder="Enter number"
							onChange={this.handleChange}
							name="number"
						/>
						{errors && <p>Ups error</p>}
					</label>

					<label className={style.title}>
						Email
						<input
							className={style.formInput}
							value={email}
							name="email"
							type="text"
							placeholder="Enter email"
							onChange={this.handleChange}
						/>
						{errors && <p>Ups error</p>}
					</label>
					<label className={style.title}>
						Some text
						<textarea
							name="text"
							className={style.textArea}
							value={text}
							type="text"
							placeholder="Enter text"
							onChange={this.handleChange}
						/>
						{errors && <p>Ups error</p>}
					</label>

					<button type="submit" className={style.submitBtn}>
						Post contact
					</button>

					<button
						type="button"
						className={style.submitBtn}
						onClick={this.handleFake}
					>
						Generate fake contact
					</button>
				</form>
				{loader && <h4>Загружаю.....</h4>}
				{formStatus && <h4>Ваше письмо отправлено</h4>}
			</>
		);
	}
}
