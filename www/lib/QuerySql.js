var QuerySql = 
{
    //PERSONELTANIMLAMA
    PersonelGetir : 
    {
        query : "SELECT KODU AS KODU,ADI AS ADI FROM PERSONEL WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY KODU",
        param : ['KODU'],
        type : ['string|25']
    },
    PersonelInsert :
    {
        query : "INSERT INTO PERSONEL " +
                "([KODU] " +
                ",[ADI]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI)                  --<ADI, nvarchar(50),> " ,
        param : ['KODU','ADI'],
        type : ['string|25','string|50']
    },
    PersonelDelete :
    {
        query : "DELETE FROM PERSONEL WHERE KODU = @KODU" ,
        param : ['KODU'],
        type : ['string|25']
    },
    //ISEMRITANIMLA
    IsEmriGetir : 
    {
        query : "SELECT KODU AS KODU,ADI AS ADI FROM ISEMRI WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY KODU",
        param : ['KODU'],
        type : ['string|25']
    },
    IsEmriInsert :
    {
        query : "INSERT INTO ISEMRI " +
                "([KODU] " +
                ",[ADI]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI)                  --<ADI, nvarchar(50),> " ,
        param : ['KODU','ADI'],
        type : ['string|25','string|50']
    },
    IsEmriDelete :
    {
        query : "DELETE FROM ISEMRI WHERE KODU = @KODU" ,
        param : ['KODU'],
        type : ['string|25']
    },
    //ISEMRIHAREKET
    IsEmriHareketGetir : 
    {
        query : "SELECT " +
                "UID AS UID, " +
                "KODU AS KODU, " +
                "(SELECT ADI FROM ISEMRI WHERE ISEMRI.KODU = ISEMRIHAREKET.KODU) AS ISEMRIADI, " +
                "PERKODU AS PERKODU, " +
                "(SELECT ADI FROM PERSONEL WHERE PERSONEL.KODU = ISEMRIHAREKET.PERKODU) AS PERSONELADI, " +
                "CONVERT(VARCHAR,BASTARIH,102) AS BASTARIH," +
                "CASE WHEN BITTARIH = '1900.01.01' THEN 'BELİRTİLMEMİŞ' ELSE CONVERT(VARCHAR,BITTARIH,102) END AS BITTARIH, " +
                "CASE WHEN DURUM = 0 THEN 'AÇIK' WHEN DURUM = 1 THEN 'KAPALI' END AS DURUM FROM ISEMRIHAREKET WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY KODU " ,
        param : ['KODU'],
        type : ['string|25']
    },
    IsEmriHareketInsert : 
    {
        query : "INSERT INTO [dbo].[ISEMRIHAREKET] " +
                "([KODU] " +
                ",[PERKODU] " +
                ",[BASTARIH] " +
                ",[BITTARIH] " + 
                ",[DURUM]) " +
                "VALUES " +
                "(@KODU                     --<KODU, nvarchar(25),> \n" +
                ",@PERKODU                  --<PERKODU, nvarchar(25),> \n" +
                ",@BASTARIH                 --<BASTARIH, datetime,> \n" +
                ",@BITTARIH                 --<BITTARIH, datetime,> \n" +
                ",@DURUM)                           --<DURUM, int,> " ,
        param : ['KODU','PERKODU','BASTARIH','BITTARIH','DURUM'],
        type : ['string|25','string|25','date','date','int']
    },
    IsEmriHareketDelete :
    {
        query : "DELETE FROM ISEMRIHAREKET WHERE UID = @UID" ,
        param : ['UID'],
        type : ['string|127']
    },
    IsEmriHareketRowUpdate :
    {
        query : "UPDATE ISEMRIHAREKET SET DURUM = @DURUM,BITTARIH = @BITTARIH WHERE UID = @UID" ,
        param : ['DURUM','BITTARIH','UID'],
        type : ['int','date','string|127']
    },
    IsEmriHareketUpdate :
    {
        query : "UPDATE ISEMRIHAREKET SET DURUM = @DURUM,BITTARIH = @BITTARIH WHERE KODU = @KODU" ,
        param : ['DURUM','BITTARIH','KODU'],
        type : ['int','date','string|25']
    },
};


