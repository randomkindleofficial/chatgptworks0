


const fileUploadForm = document.getElementById('file-upload-form');

fileUploadForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const files = document.getElementById('file-input').files;
    const storageRef = firebase.storage().ref();



    for (let i = 0; i < files.length; i++) {
        document.getElementById("infobar").hidden = false;
        document.getElementById("s_btn").style.visibility = 'hidden';
        document.getElementById("infobar_2").innerText = i + 1;

        const file = files[i];
        const fileType = file.type.split('/')[0]; // get file type (audio, image, or video)
        const fileName = file.name;
        const fileRef = storageRef.child(`${fileType}s/${fileName}`); // create a reference to the file in Firebase Storage

        // upload the file to Firebase Storage
        fileRef.put(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            })
            document.getElementById("infobar_1").innerText = Number(document.getElementById("infobar_1").innerText) + 1;
            console.log(`${fileName} has been uploaded!`);
        }).then(() => {
            
            if (Number(document.getElementById("infobar_1").innerText) == i+1) {
                document.getElementById("infobar").hidden = true;
                document.getElementById("s_btn").style.visibility = 'visible';
                document.getElementById("v_btn").style.visibility = 'visible';
                alert("Upload successful!")
            }
        }).catch((error) => {
            console.error(`Error uploading ${fileName}: ${error}`);
        });
    }



});

function authAdmin() {
    localStorage.getItem(login)
}