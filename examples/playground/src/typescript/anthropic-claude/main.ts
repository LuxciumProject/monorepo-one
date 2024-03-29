import AdmZip from 'adm-zip';

// reading archives
const zip = new AdmZip("/home/luxcium/seagate/MJ-backups/unzip-folder/midjourney_session_2023-12-25_[150-200].zip");
const zipEntries = zip.getEntries(); // an array of ZipEntry records

zipEntries.forEach((zipEntry: any) => {
    console.log(zipEntry.toString()); // outputs zip entries information
    if (zipEntry.entryName === "my_file.txt") {
        console.log(zipEntry.getData().toString('utf8'));
    }
});

// extracts the specified file to the specified location
zip.extractEntryTo("my_file.txt", "/home/luxcium/seagate/MJ-backups/unzip-folder", false, true);
