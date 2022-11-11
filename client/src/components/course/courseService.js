export const getUsers = async() => {
    const result = await fetch("/api/user");
    let users = await result.json();
    return users
}
