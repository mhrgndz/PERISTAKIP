function PersonelTanimlaCtrl($scope,$window,db)
{
    let PersonelListRow = null;

    function Init()
    {
        $scope.Firma = "PERISTAKIP"
        $scope.PersonelKodu = "";
        $scope.PersonelAdi = "";

        $scope.PersonelList = [];
    }
    function InitPersonelGrid()
    {    
        $("#TblPersonelList").jsGrid
        ({
            
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PersonelList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                    {
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "TARIH",
                    type: "text",
                    align: "center",
                    width: 150
                },
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Seç")
                                .on("click", function() 
                                {
                                    $('#PersonelListele').modal("hide");
                                });
                        },
                        width: 50
                    }
                ],
            ],
            rowClick: function(args)
            {
                $scope.PersonelListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function PersonelInsert()
    {
        var InsertData = 
        [
            $scope.PersonelKodu,
            $scope.PersonelAdi
        ];
        db.ExecuteTag($scope.Firma,'PersonelInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult) != 'undefined')
            {
                alertify.alert("Kayıt İşlemi Başarıyla Gerçekleşti.");
                $scope.PersonelAdi = "";
                $scope.PersonelKodu = "";
            }
            else
            {
                alertify.alert("Kayıt İşlemi Gerçekleştirilemedi.");
            }
        });
    }
    function PersonelDelete()
    {
        db.ExecuteTag($scope.Firma,'PersonelDelete',[$scope.PersonelKodu],async function(InsertResult)
        {   
            $scope.PersonelKodu = "";
            $scope.PersonelAdi = "";
            alertify.alert("Personel Başarıyla Silindi.");
        });
    }
    async function PersonelGetir(pKod)
    {
        await db.GetPromiseTag($scope.Firma,'PersonelGetir',[pKod],function(Data)
        {
            $scope.PersonelList = Data;
            $("#TblPersonelList").jsGrid({data : $scope.PersonelList}); 
        });
    }
    $scope.Yeni = function()
    {
        Init();
        InitPersonelGrid();
    }
    $scope.PersonelListRowClick = function(pIndex,pItem,pObj)
    {
        if ( PersonelListRow ) { PersonelListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblPersonelList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PersonelListRow = $row;

        $scope.PersonelKodu = pItem.KODU
        $scope.PersonelAdi = pItem.ADI
    }
    $scope.BtnPersonelListele =async function()
    {
        await PersonelGetir('');
        $('#PersonelListele').modal("show");
    }
    $scope.BtnKaydet = async function()
    {
        if($scope.PersonelKodu != '' && $scope.PersonelAdi != '')
        {
            await PersonelGetir($scope.PersonelKodu);

            if($scope.PersonelList.length == 0)
            {
                PersonelInsert();
            }
            else
            {
                alertify.alert("Girmiş Olduğunuz Personel Kodunda Kayıt Bulunmakta.");
            }
        }
        else
        {
            alertify.alert("Lütfen Boş Alanları Doldurunuz.");
        }
    }
    $scope.BtnPersonelDelete = function()
    {
        if($scope.PersonelKodu != '')
        {
            PersonelDelete();
        }
        else
        {
            alertify.alert("Silinecek Personel Bulunamadı.");
        }
    }
}