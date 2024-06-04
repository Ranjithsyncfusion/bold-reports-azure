﻿$(document).ready(function () {
    removeError();
    document.getElementById("schema-name").ej2_instances[0].value = defaultValues.DefaultSchemaForMSSQL;
    
    if (!isSiteCreation) {
        $("#table-prefix-name").show();
        $("#table-prefix-ums").show();
        document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
        document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
    }
    else {
        $("#table-prefix-name").hide();
        $("#table-prefix-ums").hide();
    }

    if (isBoldBI) {
        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
        document.getElementById("txt-server-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
    }
    else {
        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
        document.getElementById("txt-server-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
    }
    
    $("#db-content-holder").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            servername: {
                isRequired: true
            },
            portnumber: {
                isRequired: true
            },
            username: {
                required: true,
                sqlUsernamevalidation: true
            },
            password: {
                required: true,
                isValidCredentials: true
            },
            dbname: {
                required: true,
                isValidDatabaseName: true
            },
            databaseName: {
                required: true,
                isValidDatabaseName: true
            },
            serverdbname: {
                required: true,
                isValidDatabaseName: true
            },
            serverexistingdbname: {
                required: true,
                isValidDatabaseName: true
            },
            designerdbname: {
                required: true,
                isValidDatabaseName: true
            },
            designerexistingdbname: {
                required: true,
                isValidDatabaseName: true
            },
            umsPrefix: {
                isWhitespaceOrNumeric: true
            },
            serverPrefix: {
                isWhitespaceOrNumeric: true
            },
            tablePrefix: {
                isWhitespaceOrNumeric: true
            },
            tenantTablePrefix: {
                isWhitespaceOrNumeric: true
            },
            serverPrefixName: {
                isWhitespaceOrNumeric: true
            },
            serverTablePrefix: {
                isWhitespaceOrNumeric: true
            },
            schemaName: {
                isWhitespaceOrNumeric: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
            if (element.id === "txt-dbname") {
                $(".database-error").html("").hide();
            }

            if (element.id === "database-name") {
                $(".database-error").html("").hide();
            }
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").css("display", "block").html(error.html());
            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.Server.App.LocalizationContent.ServerNamevalidator
            },
            portnumber: {
                isRequired: window.Server.App.LocalizationContent.PortValidator
            },
            username: {
                required: window.Server.App.LocalizationContent.UserNameValidator
            },
            password: {
                required: window.Server.App.LocalizationContent.PasswordValidator
            },
            dbname: {
                required: window.Server.App.LocalizationContent.TheDatabaseValidator
            },
            databaseName: {
                required: window.Server.App.LocalizationContent.TheDatabaseValidator
            },
            serverdbname: {
                required: window.Server.App.LocalizationContent.TheTenantServerDatabaseValidator
            },
            serverexistingdbname: {
                required: window.Server.App.LocalizationContent.TheTenantServerDatabaseValidator
            },
            designerdbname: {
                required: window.Server.App.LocalizationContent.TheDesignerDatabaseValidator
            },
            designerexistingdbname: {
                required: window.Server.App.LocalizationContent.ExistingDatabaseValidator
            }
        }
    });

    $("#txt-password-db").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            password: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            password: {
                isRequired: window.Server.App.LocalizationContent.PasswordValidator
            }
        }
    });

    $("#txt-servername").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            servername: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.Server.App.LocalizationContent.ServerNamevalidator
            }
        }
    });

    $("#txt-portnumber").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            portnumber: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").css("display", "block").text(error.html());
            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.Server.App.LocalizationContent.PortValidator
            }
        }
    });

    $("#txt-login").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            username: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            username: {
                isRequired: window.Server.App.LocalizationContent.UserNameValidator
            }
        }
    });

    if (isSiteCreation === "false") {
        var interval = setInterval(function () {
            $.ajax({
                type: "GET",
                url: progressStatusUrl,
                success: function (result) {
                    $(".deployment-status").text(result.Message);
                    $(".progressBar-container .progress-bar").width(result.Percentage);
                    if (result.Percentage == "100%") {
                        clearInterval(interval);
                        $.ajax({
                            type: "POST",
                            url: deleteStatusUrl,
                            success: function (data) {
                                if (data) {
                                    $(".progressBar-container .progress-bar").width("10%")
                                }
                            }
                        });
                    }
                }
            });
        }, 3000);
    }
});




$(document).on("click", "#know-more-error", function () {
    messageBox("su-login-error", window.Server.App.LocalizationContent.DatabaseError, errorContent, "success", function () {
        onCloseMessageBox();
    });
});


$(document).on("click", "#db-config-submit, #sql-existing-db-submit", function () {
    removeError();
    var clickedButton = $(this);
    if (!isSiteCreation) {
        validateStartup(function (result) {
            if (result) {
                messageBox("su-login-error", window.Server.App.LocalizationContent.ConfigurationError, window.Server.App.LocalizationContent.ConfigurationErrorMessage, "success", function () {
                    onCloseMessageBox();
                });
            }
            else {
                databaseConfiguration(clickedButton);
            }
        });
    }
    else {
        databaseConfiguration(clickedButton);
    }
});

function databaseConfiguration(clickedButton) {
    var databaseValidationMessage = window.Server.App.LocalizationContent.OneOrMoreErrors.format("<a id='know-more-error'>", "</a>");
    var isNewDatabaseTab = clickedButton.attr("id") == "db-config-submit";
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
    var canProceed = $("#db-content-holder").valid();
    if (canProceed) {
        showWaitingPopup('startup-waiting-element');
        $("#startup-waiting-element").find(".e-spinner-pane").css("height", $("#startup-waiting-element").height())
        clickedButton.prop("disabled", true);
        window.serverName = $("#txt-servername").val();
        window.portNumber = $("#txt-portnumber").val();
        window.maintenanceDb = $('#maintenance-db').val();
        window.IsWindowsAuthentication = getRadioButtonValue("checkWindows") == "windows";
        window.login = $("#txt-login").val();
        window.password = $("#txt-password-db").val();
        var databaseType = getDropDownValue("database-type");
        window.databaseName = isNewDatabaseTab ? $("#txt-dbname").val() : $("#database-name").val();
        window.serverDatabaseName = isNewDatabaseTab ? $("#server-dbname").val() : $("#server-existing-dbname").val();
        window.intermediateDatabaseName = isNewDatabaseTab ? $("#imdbname").val() : $("#imdb-existing-dbname").val();
        window.sslEnabled = $("#secure-sql-connection").is(":checked");
        window.additionalParameters = $("#additional-parameter").val();
        window.schemaName = $("#schema-name").val();
        window.tenantPrefix = isAdvancedTab ? (isNewDatabaseTab ? $("#server-prefix-name").val(): $("#server-table-prefix").val()) : (isNewDatabaseTab ? $("#txt-server-prefix").val() : $("#tenant-table-prefix").val());

        if (!isSiteCreation) {
            window.prefix = isNewDatabaseTab ? $("#txt-ums-prefix").val() : $("#ums-table-prefix").val();
            if (window.tenantPrefix === "") {
                if (isBoldBI) {
                    window.tenantPrefix = defaultValues.DefaultPrefixForBI;
                }
                else {
                    window.tenantPrefix = defaultValues.DefaultPrefixForReports;

                }
            }
            if (window.prefix === "") {
                window.prefix = defaultValues.DefaultPrefixForUMS;
            }
        }
        else {
            if (window.tenantPrefix === "") {
                if (!isBoldReportsTenantType()) {
                    window.tenantPrefix = defaultValues.DefaultPrefixForBI;
                }
                else {
                    window.tenantPrefix = defaultValues.DefaultPrefixForReports;

                }
            }
        }
        if (window.schemaName === "") {
            if (databaseType === "MSSQL") {
                window.schemaName = defaultValues.DefaultSchemaForMSSQL;
            }
            else if (databaseType === "PostgreSQL") {
                window.schemaName = defaultValues.DefaultSchemaForPostgres;
            }
        }
        
        if (!isNewDatabaseTab) {
            var tenantype = $("#tenant-type").val() === "" ? getTenantType() : $("#tenant-type").val();
        }
        doAjaxPost("POST", connectDatabaseUrl,
            {
                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: isNewDatabaseTab, TenantType: getTenantType(), additionalParameters: window.additionalParameters, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                isSimpleMode: isSimpleModeSelction()
            },
            function (result) {
                if (result.Data.key) {
                    window.connectionString = result.Data.connectionResponse.ServerConnectionString;
                    window.tenantServerConnectionString = result.Data.connectionResponse.TenantServerConnectionString;
                    window.intermediateServerConnectionString = result.Data.connectionResponse.IntermediateServerConnectionString;
                    var databaseType = getDropDownValue("database-type");
                    if (isNewDatabaseTab) {
                        doAjaxPost("POST", generateDatabaseUrl,
                            {
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: true, additionalParameters: window.additionalParameters, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                                isSimpleMode: isSimpleModeSelction()
                            },
                            function (result) {
                                hideWaitingPopup('startup-waiting-element');
                                if (result.Data.key) {
                                    registration(isSimpleModeSelction());
                                }
                                else {
                                    $("#db-config-submit").prop("disabled", false);
                                    errorContent = result.Data.value;
                                    $(".database-error").html(databaseValidationMessage).show();
                                }
                                changeFooterPostion();
                            }
                        );
                    }
                    else {
                        doAjaxPost("POST", checkTableExistsUrl,
                            {
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, TenantType: tenantype, IsNewDatabase: false, additionalParameters: window.additionalParameters, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                                isSimpleMode: isSimpleModeSelction()
                            },
                            function (result) {
                                var items = result.Data.value;
                                if (result.Data.key && items.length > 0) {
                                    hideWaitingPopup('startup-waiting-element');
                                    var html = window.Server.App.LocalizationContent.TablesAlreadyExists;
                                    html += "<ol class='list-area'>";
                                    for (var t = 0; t < items.length; t++) {
                                        html += "<li>" + items[t] + "</li>";
                                    }
                                    html += "</ol>";
                                    errorContent = html;
                                    var id = result.Data.isServerError ? "#server-existing-dbname" : "#database-name";
                                    $(id).closest(".txt-holder").addClass("has-error");
                                    $(id).parent().find(">.startup-validation").html(databaseValidationMessage).show();
                                    $(".database-error").html(databaseValidationMessage).show();
                                    $(".server-schema-prefix-hide").removeClass("show").addClass("hidden");
                                    $("#sql-existing-db-submit").prop("disabled", false);
                                } else if (!result.Data.key && items.length <= 0) {
                                    doAjaxPost("POST", generateSQLTablesUrl,
                                        {
                                            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, IsNewDatabase: false, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix })
                                        },
                                        function (result) {
                                            hideWaitingPopup('startup-waiting-element');
                                            if (result.Data.key) {
                                                registration(isSimpleModeSelction());
                                            }
                                            else {
                                                $("#sql-existing-db-submit").prop("disabled", false);
                                                $("#db_loader").hide();
                                                errorContent = result.Data.value;
                                                $(".database-error").html(databaseValidationMessage).show();
                                            }
                                        }
                                    );
                                    $(".db-connect-outer-container").find(".title").html(window.Server.App.LocalizationContent.DatabaseCreation + "!");
                                    $("#database-name").focus();
                                } else {
                                    hideWaitingPopup('startup-waiting-element');
                                    $("#db_config_generate, #db-config-submit").hide();
                                    $("#sql-existing-db-submit").show().prop("disabled", false);
                                    errorContent = result.Data.value;
                                    $(".database-error").html(databaseValidationMessage).show();
                                }
                            });
                    }

                    $(".db-connect-outer-container").find(".title").html(window.Server.App.LocalizationContent.DatabaseCreation + "!");
                    $("#txt-dbname").focus();
                }
                else {
                    hideWaitingPopup('startup-waiting-element');
                    if (isNewDatabaseTab) {
                        $("#db-config-submit").show().prop("disabled", false);
                    }
                    else {
                        $("#sql-existing-db-submit").show().prop("disabled", false);
                    }

                    errorContent = result.Data.value;
                    $("#additional-parameter").closest('div').addClass("e-error");
                    $("#additional-parameter").closest(".e-outline").siblings(".startup-validation").html(databaseValidationMessage).show();
                }
            }
        );
    }
}

function registerApplication(isSimpleMode) {
    getFormData();
    hideWaitingPopup('startup-waiting-element');
    $(".startup-waiting-popup").addClass("storage-page-content");
    var elem = $(".system-startUp-settings-bg");
    $(".e-text").find(".configuration-status").remove();
    $(".e-text").append('<span class="configuration-status"></span>');
    $("#progress-parent-container").show();
    var globalAdminDetails = $("#global-admin-details").val();
    var systemSettingsData = $("#system-settings-data").val();
    var azureData = $("#azure-data").val();
    var tenantInfo = $("#tenant-info").val();
    $.ajax({
        url: setSystemSettingsUrl,
        type: "POST",
        data: {
            systemSettingsData: systemSettingsData,
            azureData: azureData,
            tenantInfo: tenantInfo,
            globalAdminDetails: globalAdminDetails,
            isSimpleMode: isSimpleMode,
        },
        success: function (setSystemSettingsResponse) {
            if (setSystemSettingsResponse.redirectUrl != null) {
                window.location = setSystemSettingsResponse.redirectUrl;
            }
            else {
                $(".progressBar-container").hide();
                $(".deployment-status").hide();
                $(".deployment-error").show();
                document.getElementById("error-display").innerHTML = setSystemSettingsResponse.error;
            }
        },
        error: function (setSystemSettingsResponse) {

        }
    });
}

function registration(isSimpleMode) {
    $("#image-parent-container, #system-settings-db-selection-container").hide();
    delete window.serverName;
    delete window.portNumber;
    delete window.login;
    delete window.password;
    delete window.databaseName;
    delete window.sslEnabled;
    if (isSimpleMode && !isAzureApplication) {
        registerApplication(isSimpleMode);
    }
    else if (isAzureApplication) {
        azureStep();
    }
    else {
        advancedThirdStep();
    }
}

function azureStep() {
    $("#file-storage").prop("disabled", true);
    $("#blob-storage").prop("checked", true);
    $(".custom-endpoint-form-element, .report-content").hide();
    $("#blob-storage-form").slideDown("slow");
    $("#report-storage").hide();
    $(".content-value").hide();
    storageButtonValue = "tenant";
    $(".storage-checkbox").hide();
    $("body").removeClass("startup-page-container-body");

    if (connectionType === "https") {
        $("#https").prop("checked", true);
    } else if (connectionType === "http") {
        $("#http").prop("checked", true);
    }

    $("#txt-accountname").val(storageAccountName);
    $("#txt-endpoint").val(blobServiceEndpoint);
    $("#txt-accesskey").val(accessKey);
    $("#txt-containername").val(containerName);
    validate_storage_type();
}

function advancedThirdStep() {
    $("#image-parent-container").show();
    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
    $(".startup-content span.first-content").hide().text(window.Server.App.LocalizationContent.YourStorage).slideDown();
    $(".startup-content span.second-content").hide().text(isBoldBI ? window.Server.App.LocalizationContent.StorageBIMsg : window.Server.App.LocalizationContent.StorageReportsMsg).slideDown();
    $(".startup-content a#help-link").attr("href", idStorageConfiguration);
    $(".startup-waiting-popup").addClass("storage-page-content");
    $("#system-settings-filestorage-container").slideDown("slow");
    $(".custom-endpoint-form-element, .report-content").hide();
    $("#blob-storage-form").hide();
    $("#report-storage").hide();
    storageButtonValue = "tenant";
    $(".storage-checkbox").hide("slow");
}

function forceToLower(input) {
    input.value = input.value.toLowerCase();
}

function validateNoWhiteSpace(input) {
    input.value = input.value.replace(/\s/g, '');
}


function DomResize() {
    //$("#startup-page-conatiner").height($("#system-settings-general").height() + $("#base-footer-div").height());
}

function onDatbaseChange(args) {
    removeError();
    var checkedVal = args.value.toLowerCase();
    if (!isSiteCreation) {
        $("#admin-nav").show();

    }
    else if (!isBoldReportsTenantType() && isSiteCreation) {
        $("#admin-nav").show();
    }
    else if (isBoldReportsTenantType && isSiteCreation) {
        $("#admin-nav").hide();
    }
    if (isSiteCreation) {
        $("#table-prefix-name").hide();
        $("#table-prefix-ums").hide();
    }
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
    if (isAdvancedTab) {
        $("#simple-server-prefix").hide();
        $("#simple-tenant-prefix").hide();
    }
    else {
        $("#simple-server-prefix").show();
        $("#simple-tenant-prefix").show();
    }

    if (!isSiteCreation) {
        $(".simple-id-schema-prefix-hide").removeClass("hidden").addClass("show");
        if (isAdvancedTab) {
            $(".advance-schema-prefix-hide").removeClass("hidden").addClass("show");
        }
    }

    showDataStore();
    switch (checkedVal) {
        case "mssql":
            $('.port-num').removeClass("show").addClass("hidden");
            $('.maintenancedb').removeClass("show").addClass("hidden");
            $('.auth-type').removeClass("hidden").addClass("show");
            var isWindowsAuth = getRadioButtonValue("checkWindows") === "windows";
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            document.getElementById("txt-login").ej2_instances[0].enabled = !isWindowsAuth;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = !isWindowsAuth;
            $('#db-content-holder').css("display", "block");
            $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            if (!isSiteCreation && isBoldReports)
            {
                $('.database-schema-prefix-hide').removeClass("hidden").addClass("show"); 
            }
            else {
                $('.database-schema-prefix-hide').removeClass("show").addClass("hidden"); 
            }
 
            if (actionType.toLowerCase() != "edit") {
                document.getElementById("schema-name").ej2_instances[0].value = defaultValues.DefaultSchemaForMSSQL;

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        $('.database-schema-prefix-hide').removeClass("show").addClass("hidden"); 
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        $('.database-schema-prefix-hide').removeClass("hidden").addClass("show"); 
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    if (isAdvancedTab) {
                        $("#simple-server-prefix").hide();
                        $("#simple-tenant-prefix").hide();
                    }

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }
            }
            else {
                $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", sqlParameter);
            DomResize();
            break;
        case "mssqlce":
            $('#db-content-holder').css("display", "none");
            $('#db-config-submit,#sql-existing-db-submit').addClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("hide").addClass("show");
            break;
        case "mysql":
            $('.port-num').removeClass("hidden").addClass("show");
            $('.maintenancedb').removeClass("show").addClass("hidden");
            $('.auth-type').removeClass("show").addClass("hidden");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true; 
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            $("#input-schema").hide();
            $(".server-schema-prefix-hide").removeClass("hidden").addClass("show");
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            document.getElementById("schema-name").ej2_instances[0].value = "";

            if (actionType.toLowerCase() != "edit") {

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    $(".simple-id-schema-prefix-hide").removeClass("hidden").addClass("show");
                    if (isAdvancedTab) {
                        $("#simple-server-prefix").hide();
                        $("#simple-tenant-prefix").hide();
                        $(".server-schema-prefix-hide").removeClass("show").addClass("hidden");
                    }
                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }
            }
            else {
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", mySQLParameter);
            $(".database-schema-prefix-hide").removeClass("show").addClass("hidden");
            DomResize();
            break;
        case "oracle":
            $("#oracle-dsn>option:eq(0)").prop("selected", true);
            $("#oracle-dsn").selectpicker("refresh");
            $(".database-dropdown-oracle ul").html("");
            $("#database-name-oracle").html("<option value='' class='display-none'>" + window.Server.App.LocalizationContent.SelectDatabase + "</option>");
            $("#database-name-oracle").selectpicker("refresh");
            $("#new-db-oracle").prop("checked", true).trigger("change");
            $(".content-display").hide();
            $(".show-oracle-content").slideDown("slow");
            $("div.placeholder").remove();
            DomResize();
            break;
        case "postgresql":
            $('.auth-type').removeClass("show").addClass("hidden");
            $('.port-num').removeClass("hidden").addClass("show");
            $('.maintenancedb').removeClass("hidden").addClass("show");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            if (!isSiteCreation && isBoldReports) {
                $('.database-schema-prefix-hide').removeClass("hidden").addClass("show");
                $('.server-schema-prefix-hide').removeClass("hidden").addClass("show"); 
            }
            else {
                $('.database-schema-prefix-hide').removeClass("show").addClass("hidden");
                $('.server-schema-prefix-hide').removeClass("show").addClass("hidden");
            }

            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            
            if (actionType.toLowerCase() != "edit") {
                document.getElementById("schema-name").ej2_instances[0].value = defaultValues.DefaultSchemaForPostgres;

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        $('.database-schema-prefix-hide').removeClass("show").addClass("hidden");
                        $('.server-schema-prefix-hide').removeClass("show").addClass("hidden");
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        $('.database-schema-prefix-hide').removeClass("hidden").addClass("show");
                        $('.server-schema-prefix-hide').removeClass("hidden").addClass("show"); 
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    if (isAdvancedTab) {
                        $("#simple-server-prefix").hide();
                        $("#simple-tenant-prefix").hide();
                        $(".server-schema-prefix-hide").removeClass("show").addClass("hidden");
                        $(".simple-exist-schema-prefix-hide").removeClass("show").addClass("hidden");
                    }
                    else {
                        $(".server-schema-prefix-hide").removeClass("hidden").addClass("show");
                        $(".simple-exist-schema-prefix-hide").removeClass("hidden").addClass("show");
                    } 

                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }

            }
            else {
                $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", postgresSQLParameter);
            DomResize();
            if (isSiteCreation) {
                ResizeHeightForDOM();
            }

            break;
    }

    $("#new-db").prop("checked", true).trigger("change");
    if (getRadioButtonValue("databaseType") == "1") {
        $("#sql-existing-db-submit, .sql-server-existing-db").show();
        $(".database-name, #db-config-submit").hide();
        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (isAdvancedTab) {
            $("#simple-server-prefix").hide();
            $("#simple-tenant-prefix").hide();
        }
        else {
            $("#simple-server-prefix").show();
            $("#simple-tenant-prefix").show();
        }
    }
    else {
        $("#sql-existing-db-submit, .sql-server-existing-db").hide();
        $(".database-name, #db-config-submit").show();
        if (isSiteCreation) {
            $("#table-prefix-name").hide();
            $("#table-prefix-ums").hide();
        }
        else {
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            if (isAdvancedTab) {
                $("#simple-server-prefix").hide();
                $("#simple-tenant-prefix").hide();
            }
            else {
                $("#simple-server-prefix").show();
                $("#simple-tenant-prefix").show();
            }
        }
    }

    if (actionType.toLowerCase() != "edit") {
        document.getElementById("txt-login").ej2_instances[0].value = null;
        document.getElementById("txt-password-db").ej2_instances[0].value = null;
        document.getElementById("txt-servername").ej2_instances[0].value = null;
        document.getElementById("additional-parameter").ej2_instances[0].value = null;
    }
    else {
        $("#table-prefix-name").hide();
        $("#table-prefix-ums").hide();
    }

    if (typeof actionType != 'undefined' && actionType.toLowerCase() != "edit") {
        switch (checkedVal) {
            case "mysql":
                $('#txt-portnumber-info').html(window.Server.App.LocalizationContent.MySqlPortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = defaultValues.MySQLPort;
                break;
            case "postgresql":
                $('#txt-portnumber-info').html(window.Server.App.LocalizationContent.postgresPortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = defaultValues.PostgreSQLPort;
                document.getElementById("maintenance-db").ej2_instances[0].value = defaultValues.PostgreSQLMaintenanceDatabase;
                break;
        }
    }

    if (isSiteCreation) {
        if (!isBoldReportsTenantType()) {
            $('.schema-prefix-hide').removeClass("show").addClass("hidden");
        }
    }
    else {
        if (isBoldBI) {
            $('.schema-prefix-hide').removeClass("show").addClass("hidden");
        }
    }
    addPlacehoder("#system-settings-db-selection-container");
    changeFooterPostion();
};

function onWindowsChange(args) {
    var windowsCheck = args.value == "windows";
    var databaseType = getDropDownValue("database-type");
    $("#auth-type-info").removeClass("show").addClass("hide");
    if (windowsCheck && databaseType == "MSSQL") {
        document.getElementById("txt-login").ej2_instances[0].enabled = false;
        document.getElementById("txt-password-db").ej2_instances[0].enabled = false;
        document.getElementById("txt-login").ej2_instances[0].value = null;
        document.getElementById("txt-password-db").ej2_instances[0].value = null;
        $("#auth-type-info").removeClass("hide").addClass("show");
    }
    else if (databaseType == "MSSQL") {
        document.getElementById("txt-login").ej2_instances[0].enabled = true;
        document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
    }
    removeError();
}


function onDbSelectChange() {
    removeError();
    if ($("input[name='databaseType']:checked").val() === "1") {
        $(".sql-server-existing-db, #sql-existing-db-submit").show();
        $(".database-name, #db-config-submit").hide();
        if (isSiteCreation) {
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            if (!isAdvancedTab) {
                $("#simple-tenant-prefix").show();
            }
        }
        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (isAdvancedTab) {
            $(".advance-schema-prefix-hide").removeClass("show").addClass("hidden");
            $(".simple-exist-schema-prefix-hide").removeClass("show").addClass("hidden");
        }
        /*need to check in reports for startup*/
        $(".server-schema-prefix-hide").removeClass("show").addClass("hidden");
        $(".simple-id-schema-prefix-hide").removeClass("show").addClass("hidden");
        if (isSiteCreation) {
            $(".id-schema-prefix-hide").removeClass("show").addClass("hidden");
            $(".simple-id-schema-prefix-hide").removeClass("show").addClass("hidden");
        }
    } else {
        $(".sql-server-existing-db, #sql-existing-db-submit").hide();
        $(".database-name, #db-config-submit").show();
        if (isSiteCreation) {
            $("#table-prefix-name").hide();
            $("#table-prefix-ums").hide();
            if (isBoldReportsTenantType()) {
                $('.server-schema-prefix-hide').removeClass("hidden").addClass("show");
            }
            else {
                $('.server-schema-prefix-hide').removeClass("show").addClass("hidden");
            }
        }
        else {
            if (isBoldReports) {
                $(".simple-id-schema-prefix-hide").removeClass("hidden").addClass("show");
                $(".server-schema-prefix-hide").removeClass("hidden").addClass("show");
            }
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            if (isAdvancedTab) {
                $("#simple-server-prefix").hide();
                $("#simple-tenant-prefix").hide();
                $(".advance-schema-prefix-hide").removeClass("hidden").addClass("show");
                $(".server-schema-prefix-hide").removeClass("show").addClass("hidden");
            }
            else {
                $("#simple-server-prefix").show();
                $("#simple-tenant-prefix").show();
            }
        }
    }

    if (isSiteCreation) {
        if (!isBoldReportsTenantType()) {
            $('.schema-prefix-hide').removeClass("show").addClass("hidden");
        }
    }
    else {
        if (isBoldBI) {
            $('.schema-prefix-hide').removeClass("show").addClass("hidden");
        }
    }
    changeFooterPostion();
    DomResize();
    if (!isBoldBI) {
        hideDataStore();
    }
}

function prefillDbNames() {
    document.getElementById("txt-dbname").ej2_instances[0].value = defaultValues.DefaultDatabaseName;
    document.getElementById("server-dbname").ej2_instances[0].value = defaultValues.DefaultServerDatabaseName;
    document.getElementById("imdbname").ej2_instances[0].value = defaultValues.DefaultDatastoreDatabaseName;
}

function hideDataStore() {
    $(".data-store-hide").removeClass("show").addClass("hidden");
    $(".data-store-existing-db-hide").removeClass("show").addClass("hidden");
}

function showDataStore() {
    if (getRadioButtonValue("databaseType") == "1") {
        $(".data-store-existing-db-hide").removeClass("hidden").addClass("show");
    }
    else {
        $(".data-store-hide").removeClass("hidden").addClass("show");
    }
}

function removeError() {
    $(".e-error").removeClass("e-error");
    $(".validation-txt-errors").hide();
    $(".database-error").hide();
}

$(document).on("change", "#existing-db", function () {
    if (!isBoldBI && isSiteCreation && isBoldReportsTenantType() || !isBoldBI && !isSiteCreation) {
        hideDataStore();
    }
    else {
        $(".data-store-hide").removeClass("show").addClass("hidden");
        $(".data-store-existing-db-hide").removeClass("hidden").addClass("show");
    }
});

$(document).on("change", "#new-db", function () {
    if (!isBoldBI && isSiteCreation && isBoldReportsTenantType() || !isBoldBI && !isSiteCreation) {
        hideDataStore();
    }
    else {
        $(".data-store-hide").removeClass("hidden").addClass("show");
        $(".data-store-existing-db-hide").removeClass("show").addClass("hidden");
    }
});