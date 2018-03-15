export const getItems=(keyCode, defaultValue)=>{
	const ActiveItem = (keyCode === DOWN_KEY_CODE) ? defaultValue :
		(keyCode === UP_KEY_CODE) ? defaultValue - 2 : 0;
	const NextItem = (keyCode === DOWN_KEY_CODE) ? defaultValue + 1 :
		(keyCode === UP_KEY_CODE) ? defaultValue - 1 : 0;
	return { ActiveItem, NextItem }
}