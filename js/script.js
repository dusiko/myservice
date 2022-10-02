function focus(event) {
	const target = event.target
	if (!event.target.classList.contains('title')) {
		const list = Array.from(document.querySelectorAll('.service-list__row')).slice(1)
		list.forEach(item => item.classList.remove('focused'))
		if (target.classList.contains('service-list__row')) {
			target.classList.add('focused')
		} else if (target.classList.contains('service-list__row-item')) {
			target.parentNode.classList.add('focused')
		}

	}
}

function changingValuesInList(event) {
	if (event.target.classList.contains('service-address')) {
		const input = document.querySelector('#service-modal-input')
		const title = document.getElementById('service-modal-title')
		const text = document.querySelector('.modal-text')
		input.setAttribute('list', 'address-list')
		input.setAttribute('type', 'text')
		text.innerText = 'Адреса'
		title.innerText = 'Адреса сервіс-центра'
		input.value = ''
		const block = event.target
		const btn = document.getElementById('modalOkBtn')
		btn.onclick = () => {
			const address = input.value
			if (address.trim().length < 1)
				block.innerText = 'Вкажіть адресу сервіс-центра'
			else
				block.innerText = address
		}
	} else if (event.target.classList.contains('service-send')) {
		const input = document.querySelector('#service-modal-input')
		const title = document.getElementById('service-modal-title')
		const text = document.querySelector('.modal-text')
		input.setAttribute('type', 'date')
		text.innerText = 'Відправка'
		title.innerText = 'Дата відправки на сервіс-центр'
		input.value = ''
		const block = event.target
		const btn = document.getElementById('modalOkBtn')
		btn.onclick = () => {
			const address = input.value
			if (address.trim().length < 1)
				block.innerText = '--.--.--'
			else
				block.innerText = address.split('-').reverse().join('.')
		}

	} else if (event.target.classList.contains('service-back')) {
		const input = document.querySelector('#service-modal-input')
		const title = document.getElementById('service-modal-title')
		const text = document.querySelector('.modal-text')
		input.setAttribute('type', 'date')
		text.innerText = 'Повернення'
		title.innerText = 'Дата повернення з сервіс-центра'
		input.value = ''
		const block = event.target
		const btn = document.getElementById('modalOkBtn')
		btn.onclick = () => {
			const address = input.value
			if (address.trim().length < 1)
				block.innerText = '--.--.--'
			else
				block.innerText = address.split('-').reverse().join('.')
		}
	} else if (event.target.classList.contains('service-status')) {
		const input = document.querySelector('#service-modal-input')
		const title = document.getElementById('service-modal-title')
		const text = document.querySelector('.modal-text')
		input.setAttribute('list', 'status-list')
		input.setAttribute('type', 'text')
		text.innerText = 'Статус'
		title.innerText = 'Статус заявки'
		input.value = ''
		const block = event.target
		const btn = document.getElementById('modalOkBtn')
		btn.onclick = () => {
			const status = input.value
			if (status.trim().length < 1)
				block.innerText = 'Невідомо'
			else
				block.innerText = status
		}
	}
}

function switchEditing(event) {
	const service = document.querySelector('.service-list')
	const btnSave = document.querySelector('.btn-editing-save')
	if (event.target.classList.contains('switch-input')) {
		if (service.classList.contains('editing')) {
			// Режим редагування ВИМКНУЛИ
			service.classList.remove('editing')
			btnSave.style.display = 'none'

			//
			document.querySelector('.service-list').removeEventListener('click', AddressOptions)

			// Вимкнув Поп-ап клік на ДатаВідправлення, Адрес, ДатаПовернення
			document.querySelector('.service-list').removeEventListener('click', changingValuesInList)
			const AddressSendBackitems = document.querySelectorAll('.service-send, .service-address, .service-back, .service-status')
			AddressSendBackitems.forEach(item => item.removeAttribute('data-bs-toggle', 'modal'))

			// Видано покупцю блок
			const serviceDone = document.querySelectorAll('.service-done')
			serviceDone.forEach(item => {
				if (item.childNodes[0].checked)
					item.innerText = 'Так'
				else
					item.innerText = 'Ні'
			})

			// Блок з видаленням
			const deleteItems = document.querySelectorAll('.service-delete-title, .service-delete')
			deleteItems.forEach(item => {
				item.parentNode.removeChild(item)
			})




		} else {
			// Режим редагування ВКЛЮЧИЛИ
			service.classList.add('editing')
			btnSave.style.display = 'block'

			// ===========================
			document.querySelector('.service-list').addEventListener('click', AddressOptions)

			// Включив Поп-ап клік на ДатаВідправлення, Адрес, ДатаПовернення
			document.querySelector('.service-list').addEventListener('click', changingValuesInList)
			const AddressSendBackitems = document.querySelectorAll('.service-send, .service-address, .service-back, .service-status')
			AddressSendBackitems.forEach(item => item.setAttribute('data-bs-toggle', 'modal'))

			// Видано покупцю блок
			const serviceDone = document.querySelectorAll('.service-done')
			serviceDone.forEach(item => {
				const input = document.createElement('input')
				input.classList.add('service-done-input')
				input.setAttribute('type', 'checkbox')
				input.setAttribute('name', 'client-took')
				if (item.innerText === 'Так')
					input.setAttribute('checked', 'checked')
				item.innerText = ''
				item.appendChild(input)
			})

			// Блок з видаленням
			const parents = document.querySelectorAll('.service-list__row')
			parents.forEach(item => {
				const div = document.createElement('DIV')
				div.classList.add('service-list__row-item')
				if (item.classList.contains('title')) {
					div.classList.add('service-list__row-item')
					div.classList.add('title')
					div.classList.add('service-delete-title')
					div.innerText = 'Видалити'
				} else {
					div.classList.add('service-delete')
					const btn = document.createElement('button')
					btn.setAttribute('type', 'button')
					btn.classList.add('btn')
					btn.classList.add('btn-danger')
					btn.classList.add('btn-sm')
					btn.innerText = '-'
					div.appendChild(btn)
				}
				item.appendChild(div)
			})
		}
	}
}

function AddressOptions(event) {
	if (event.target.classList.contains('service-address')) {
		const brand = event.target.parentNode.childNodes[3].childNodes[1].innerText
		const addressList = document.querySelector('#address-list')
		addressList.innerHTML = ''
		if (data_address[brand]) {
			const option = document.createElement('option')
			option.value = data_address[brand]
			addressList.appendChild(option)
		}
	}
}

console.log(Array.from(document.querySelectorAll('.service-list__row')).slice(1))

document.querySelector('.switch').addEventListener('click', switchEditing)
document.querySelector('.service-list').addEventListener('click', focus)
