function GemiTanimlaCtrl($scope,$window,db)
{
    let GemiListRow = null;

    function Init()
    {
        $scope.Firma = "PERISTAKIP"
        $scope.GemiKodu = "";
        $scope.GemiAdi = "";

        $scope.GemiList = [];
    }
    function InitGemiGrid()
    {    
        $("#TblGemiList").jsGrid
        ({
            
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.GemiList,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("Seç")
                                .on("click", function() 
                                {
                                    $('#GemiListele').modal("hide");
                                });
                        },
                        width: 50
                    }
                ],
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
            ],
            rowClick: function(args)
            {
                $scope.GemiListRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }, 
        });
    }
    function GemiInsert()
    {
        var InsertData = 
        [
            $scope.GemiKodu,
            $scope.GemiAdi
        ];
        db.ExecuteTag($scope.Firma,'GemiInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult) != 'undefined')
            {
                alertify.alert("Kayıt İşlemi Başarıyla Gerçekleşti.");
                $scope.GemiAdi = "";
                $scope.GemiKodu = "";
            }
            else
            {
                alertify.alert("Kayıt İşlemi Gerçekleştirilemedi.");
            }
        });
    }
    function GemiDelete()
    {
        db.ExecuteTag($scope.Firma,'GemiDelete',[$scope.GemiKodu],async function(InsertResult)
        {   
            $scope.GemiKodu = "";
            $scope.GemiAdi = "";
            alertify.alert("Gemi Başarıyla Silindi.");
        });
    }
    async function GemiGetir(pKod)
    {
        await db.GetPromiseTag($scope.Firma,'GemiGetir',[pKod],function(Data)
        {
            $scope.GemiList = Data;
            $("#TblGemiList").jsGrid({data : $scope.GemiList}); 
        });
    }
    $scope.Yeni = function()
    {
        Init();
        InitGemiGrid();
    }
    $scope.GemiListRowClick = function(pIndex,pItem,pObj)
    {
        if ( GemiListRow ) { GemiListRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIsEmriList").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        GemiListRow = $row;

        $scope.GemiKodu = pItem.KODU
        $scope.GemiAdi = pItem.ADI
    }
    $scope.BtnGemiListele =async function()
    {
        await GemiGetir('');
        $('#GemiListele').modal("show");
    }
    $scope.BtnKaydet = async function()
    {
        if($scope.GemiKodu != '' && $scope.GemiAdi != '')
        {
            await GemiGetir($scope.GemiKodu);

            if($scope.GemiList.length == 0)
            {
                GemiInsert();
            }
            else
            {
                alertify.alert("Girmiş Olduğunuz Gemi Kodunda Kayıt Bulunmakta.");
            }
        }
        else
        {
            alertify.alert("Lütfen Boş Alanları Doldurunuz.");
        }
    }
    $scope.BtnGemiDelete = function()
    {
        if($scope.GemiKodu != '')
        {
            GemiDelete();
        }
        else
        {
            alertify.alert("Silinecek Gemi Bulunamadı.");
        }
    }
}