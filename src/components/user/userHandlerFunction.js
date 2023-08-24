export function handleChangeValue(event, user, setUser) {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
//    setValues({ ...values, [name]: value });
}
