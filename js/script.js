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

function addAddress(event) {
	if (event.target.classList.contains('service-address')) {
		const input = document.querySelector('#modal-address-input')
		input.value = ''
		const address_block = event.target
		const btn = document.getElementById('modalOkBtn')
		btn.onclick = () => {
			const address = input.value
			if (address.trim().length < 1)
				address_block.innerText = 'Вкажіть адресу сервіс-центра'
			else
				address_block.innerText = address
		}
	}
}
document.querySelector('.service-list').addEventListener('click', focus)
document.querySelector('.service-list').addEventListener('click', addAddress)