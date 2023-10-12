const checkCookie = (name) => {

  const cookieTime = {
    minute: 0,
    second: 0
  };

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const data = parseInt(parts.pop().split(';').shift() + '000');
    const remain = new Date(data) - Date.now();
    cookieTime.minute = parseInt((remain / 1000) / 60);
    cookieTime.second = parseInt((remain / 1000) % 60);
    // console.log(`M: ${cookieTime.minute} S: ${cookieTime.second}`);
    return cookieTime;
  }

  return null;
}

export default checkCookie;