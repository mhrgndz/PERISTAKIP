function IsEmriHareketCtrl($scope,$window,db)
{
    let IsEmriHareketListRow = null;

    function Init()
    {
        $scope.Firma = "PERISTAKIP"
        $scope.IsEmriKodu = "0";
        $scope.PersonelKodu = "0";
        $scope.BasTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.BitTarih = "01.01.1900"

        $scope.PersonelList = [];
        $scope.IsEmriList = [];
        $scope.IsEmriHareketList = [];

        $scope.IsEmriHareketListSelectedIndex = 0; 
    }
    function InitIsEmriGrid()
    {    
        $("#TblIsEmriList").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IsEmriList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "ISEMRIADI",
                    title : "İŞ EMRİ ADI",
                    type: "number",
                    align: "center",
                    width: 150
                    
                },
                {
                    name: "PERSONELADI",
                    title : "PERSONEL ADI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "BASTARIH",
                    title : "TARİH",
                    type: "text",
                    align: "center",
                    width: 100
                },
                // {
                //     name: "BITTARIH",
                //     title: "BİTİŞ TARİHİ",
                //     type: "text",
                //     align: "center",
                //     width: 100
                // },
                // {
                //     name: "DURUM",
                //     title: "DURUM",
                //     type: "text",
                //     align: "center",
                //     width: 50
                // },
                // [
                //     { 
                //         itemTemplate: function(_, item) 
                //         {
                //             return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Kapat")
                //                 .on("click", function() 
                //                 {
                //                     IsEmriHareketUpdate();
                //                 });
                //         },
                //         width: 30
                //     }
                // ],
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-danger btn-block btn-sm'></button>").text("Sil")
                                .on("click", function() 
                                {
                                    IsEmriHareketDelete();
                                });
                        },
                        width: 30
                    }
                ],
                
            ],
            rowClick: function(args)
            {
                $scope.IsEmriHareketRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    async function IsEmriHareketGetir(pKod)
    {
        await db.GetPromiseTag($scope.Firma,'IsEmriHareketGetir',[pKod],function(Data)
        {
            $scope.IsEmriHareketList = Data;
            $("#TblIsEmriList").jsGrid({data : $scope.IsEmriHareketList}); 
        });
    }
    function IsEmriHareketInsert()
    {
        var InsertData = 
        [
            $scope.IsEmriKodu,
            $scope.PersonelKodu,
            $scope.BasTarih,
            $scope.BitTarih,
            0
        ];
        db.ExecuteTag($scope.Firma,'IsEmriHareketInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult) != 'undefined')
            {
                alertify.alert("Kayıt İşlemi Başarıyla Gerçekleşti.");
            }
            else
            {
                alertify.alert("Kayıt İşlemi Gerçekleştirilemedi.");
            }
        });
    }
    function IsEmriHareketDelete()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('İş Emrini Silmek İstediğinize Emin Misiniz  ?', 
        function()
        { 
            db.ExecuteTag($scope.Firma,'IsEmriHareketDelete',[$scope.IsEmriHareketListSelectedItem.UID],async function(InsertResult)
            {   
                alertify.alert("İş Emri Başarıyla Silindi.");
                await IsEmriHareketGetir($scope.IsEmriKodu)
            });
        }
        ,function(){});
    }
    function IsEmriHareketUpdate()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('İş Emrini Kapatmak İstediğinize Emin Misiniz  ?', 
        function()
        { 
            $scope.BitTarih = moment(new Date()).format("DD.MM.YYYY");
            db.ExecuteTag($scope.Firma,'IsEmriHareketRowUpdate',[1,$scope.BitTarih,$scope.IsEmriHareketListSelectedItem.UID,],async function(InsertResult)
            {   
                alertify.alert("İş Emri Başarıyla Kapatıldı.");
                await IsEmriHareketGetir($scope.IsEmriKodu)
            });
        }
        ,function(){});
    }
    $scope.IsEmriChange =async function()
    {
        await IsEmriHareketGetir($scope.IsEmriKodu);
    }
    $scope.IsEmriHareketRowClick = function(pIndex,pItem,pObj)
    {
        if ( IsEmriHareketListRow ) { IsEmriHareketListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblSonSatis").jsGrid("rowByItem", pItem);
        
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','red');
        IsEmriHareketListRow = $row;
        $scope.IsEmriHareketListSelectedIndex = pIndex;
        $scope.IsEmriHareketListSelectedItem = pItem;
    }
    $scope.Yeni =  async function()
    {
        Init();
        InitIsEmriGrid();

        await db.GetPromiseTag($scope.Firma,'IsEmriGetir',[''],function(Data)
        {
            $scope.IsEmriList = Data;
        });
        await db.GetPromiseTag($scope.Firma,'PersonelGetir',[''],function(Data)
        {
            $scope.PersonelList = Data;
        });
    }
    $scope.BtnKaydet = async function()
    {
        if($scope.IsEmriKodu != '0' && $scope.PersonelKodu != '0')
        {
            await IsEmriHareketInsert();
            await IsEmriHareketGetir($scope.IsEmriKodu);
        }
        else
        {
            alertify.alert("Lütfen Geçerli Veriler Giriniz.");
        }
    }
    $scope.BtnYeni = function()
    {
        $scope.Yeni();
    }
    $scope.BtnTumunuKapat = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Tüm İş Emrini Kapatmak İstediğinize Emin Misiniz  ?', 
        function()
        { 
            $scope.BitTarih = moment(new Date()).format("DD.MM.YYYY");
            db.ExecuteTag($scope.Firma,'IsEmriHareketUpdate',[1,$scope.BitTarih,$scope.IsEmriKodu],async function(InsertResult)
            {   
                alertify.alert("İş Emri Başarıyla Kapatıldı.");
                await IsEmriHareketGetir($scope.IsEmriKodu)
            });
        }
        ,function(){});
    }
}