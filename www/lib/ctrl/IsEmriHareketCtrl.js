function IsEmriHareketCtrl($scope,$window,db)
{
    function Init()
    {
        db.Connection(function(data){});

        $scope.Firma = "PERISTAKIP"
    }
    $scope.Yeni = function()
    {
        Init();
    }
}