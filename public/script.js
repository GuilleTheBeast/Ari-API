document
    .getElementById('fileChooser')
    .addEventListener(
        'change',
        function () {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('contents').textContent = this.result;
            };
            fr.readAsText(this.files[0]);
        }
    );