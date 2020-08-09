var QuerySql = 
{
    //PERSONELTANIMLAMA
    PersonelGetir : 
    {
        query : "SELECT KODU AS KODU,ADI AS ADI,CONVERT(NVARCHAR, TARIH, 102) AS TARIH FROM PERSONEL WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY TARIH DESC ",
        param : ['KODU'],
        type : ['string|25']
    },
    PersonelInsert :
    {
        query : "INSERT INTO PERSONEL " +
                "([KODU] " +
                ",[ADI] " +
                ",[TARIH]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI                  --<ADI, nvarchar(50),> \n" +
                ",GETDATE())                  --<GETDATE, GETDATE(),> " ,
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
        query : "SELECT KODU AS KODU, GEMIKODU AS GEMIKODU, " +
                "TIP AS TIP, " +
                "TLPYEVMIYE AS TLPYEVMIYE, " +
                "ONYYEVMIYE AS ONYYEVMIYE, " +
                "CASE WHEN TIP = 1 THEN 'SÖZLEŞMELİ' WHEN TIP = 2 THEN 'İLAVE' WHEN TIP = 3 THEN 'YEVMİYE' END AS ISTIP, " +
                "(SELECT ADI FROM GEMI WHERE KODU = GEMIKODU) AS GEMIADI, " +
                "ADI AS ADI,CONVERT(NVARCHAR, TARIH, 102) AS TARIH FROM ISEMRI WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY TARIH DESC",
        param : ['KODU'],
        type : ['string|25']
    },
    IsEmriInsert :
    {
        query : "INSERT INTO ISEMRI " +
                "([KODU] " +
                ",[ADI] " +
                ",[GEMIKODU] " +
                ",[TIP] " +
                ",[TLPYEVMIYE] " +
                ",[ONYYEVMIYE] " +
                ",[TARIH]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI                  --<ADI, nvarchar(50),> \n" +
                ",@GEMIKODU                  --<GEMIKODU, nvarchar(25),> \n" +
                ",@TIP                  --<TIP, int,> \n" +
                ",@TLPYEVMIYE                 --<TLPYEVMIYE, int,> \n" +
                ",@ONYYEVMIYE               --<ONYYEVMIYE, int,> \n" +
                ",GETDATE())                  --<TARIH, int,> " ,
        param : ['KODU','ADI','GEMIKODU','TIP','TLPYEVMIYE','ONYYEVMIYE'],
        type : ['string|25','string|50','string|25','int','int','int']
    },
    IsEmriDelete :
    {
        query : "DELETE FROM ISEMRI WHERE KODU = @KODU" ,
        param : ['KODU'],
        type : ['string|25']
    },
    IsEmriUpdate :
    {
        query : "UPDATE ISEMRI SET TLPYEVMIYE = @TLPYEVMIYE,ONYYEVMIYE = @ONYYEVMIYE WHERE KODU = @KODU " ,
        param : ['TLPYEVMIYE','ONYYEVMIYE','KODU'],
        type : ['int','int','string|25']
    },
    //ISEMRIHAREKET
    GemiyeBagliIsEmriGetir : 
    {
        query : "SELECT KODU AS KODU, GEMIKODU AS GEMIKODU, (SELECT ADI FROM GEMI WHERE KODU = GEMIKODU) AS GEMIADI," +
                "ADI AS ADI FROM ISEMRI WHERE ((GEMIKODU = @GEMIKODU) OR (@GEMIKODU = '')) AND ((TIP = @TIP) OR (@TIP = ''))  ORDER BY KODU",
        param : ['GEMIKODU','TIP'],
        type : ['string|25','int']
    },
    IsEmriHareketGetir : 
    {
        query : "SELECT " +
                "UID AS UID, " +
                "KODU AS KODU, " +
                "(SELECT ADI FROM ISEMRI WHERE ISEMRI.KODU = ISEMRIHAREKET.KODU) AS ISEMRIADI, " +
                "PERKODU AS PERKODU, " +
                "(SELECT ADI FROM PERSONEL WHERE PERSONEL.KODU = ISEMRIHAREKET.PERKODU) AS PERSONELADI, " +
                "GEMIKODU AS GEMIKODU, " +
                "(SELECT ADI FROM GEMI WHERE GEMI.KODU = ISEMRIHAREKET.GEMIKODU) AS GEMIADI, " +
                "CASE WHEN TIP = 1 THEN 'SÖZLEŞMELİ' WHEN TIP = 2 THEN 'İLAVE' WHEN TIP = 3 THEN 'YEVMİYE' END AS ISTIP, " +
                "CONVERT(VARCHAR,BASTARIH,102) AS BASTARIH," +
                "CASE WHEN BITTARIH = '1900.01.01' THEN 'BELİRTİLMEMİŞ' ELSE CONVERT(VARCHAR,BITTARIH,102) END AS BITTARIH, " +
                "CASE WHEN DURUM = 0 THEN 'AÇIK' WHEN DURUM = 1 THEN 'KAPALI' END AS DURUM " +
                "FROM ISEMRIHAREKET WHERE ((KODU = @KODU) OR (@KODU = '')) AND BASTARIH = @BASTARIH ORDER BY KODU " ,
        param : ['KODU','BASTARIH'],
        type : ['string|25','date']
    },
    IsEmriHareketInsert : 
    {
        query : "INSERT INTO [dbo].[ISEMRIHAREKET] " +
                "([KODU] " +
                ",[PERKODU] " +
                ",[BASTARIH] " +
                ",[BITTARIH] " + 
                ",[DURUM] " +
                ",[GEMIKODU] " +
                ",[TIP]) " +
                "VALUES " +
                "(@KODU                     --<KODU, nvarchar(25),> \n" +
                ",@PERKODU                  --<PERKODU, nvarchar(25),> \n" +
                ",@BASTARIH                 --<BASTARIH, datetime,> \n" +
                ",@BITTARIH                 --<BITTARIH, datetime,> \n" +
                ",@DURUM                    --<DURUM, int,> \n" +
                ",@GEMIKODU                 --<GEMIKODU, int,> \n" +
                ",@TIP)                     --<TIP, int,> " ,
        param : ['KODU','PERKODU','BASTARIH','BITTARIH','DURUM','GEMIKODU','TIP'],
        type : ['string|25','string|25','date','date','int','string|25','int']
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
    //GEMİ
    GemiGetir : 
    {
        query : "SELECT KODU AS KODU,ADI AS ADI,CONVERT(NVARCHAR, TARIH, 102) AS TARIH FROM GEMI WHERE ((KODU = @KODU) OR (@KODU = '')) ORDER BY TARIH DESC ",
        param : ['KODU'],
        type : ['string|25']
    },
    GemiInsert :
    {
        query : "INSERT INTO GEMI " +
                "([KODU] " +
                ",[ADI] " +
                ",[TARIH]) " +
                "VALUES " +
                "(@KODU                 --<KODU, nvarchar(25),> \n" +
                ",@ADI                  --<ADI, nvarchar(50),> \n" +
                ",GETDATE())                  --<GETDATE, GETDATE(),> " ,
        param : ['KODU','ADI'],
        type : ['string|25','string|50']
    },
    GemiDelete :
    {
        query : "DELETE FROM GEMI WHERE KODU = @KODU" ,
        param : ['KODU'],
        type : ['string|25']
    },
};


