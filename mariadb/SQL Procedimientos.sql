

/* crear usuario */
    DELIMITER //
    CREATE PROCEDURE proc_user_create(
        var_email varchar(80),
        var_password varchar(50),
        var_token varchar(15),

        var_firstName varchar(50),
        var_lastName varchar(50),
        var_dateOfBirth date
    )
    BEGIN
        INSERT INTO `tbl_user` SET 
            `email` = var_email,
            `password` = var_password,
            `token` = var_token;

        INSERT INTO `tbl_profile` SET
            `firstName` = var_firstName,
            `lastName` = var_lastName,
            `dateOfBirth` = var_dateOfBirth,
            `fk_user` = ( SELECT LAST_INSERT_ID() );
    END;
    //
    DELIMITER ;

    CALL proc_user_create(
        'var_email',
        'var_password',
        'var_token',

        'var_firstName',
        'var_lastName',
        '2022/06/08'
    );
/* crear usuario */

/* Actualizar contraseña */
    DELIMITER //
    CREATE PROCEDURE proc_user_update_pass(
        var_id INT(9),
        var_password varchar(50),
        var_token varchar(15)
    )
    BEGIN
        UPDATE `tbl_user` SET 
            `password`=var_password,
            `token`=var_token
        WHERE `id`=var_id;
    END;
    //
    DELIMITER ;

    CALL proc_user_update_pass(
        1,
        'nuevaPass',
        'NuevoToken'
    );
/* Actualizar contraseña */

/* Actualizar usuario */
    DELIMITER //
    CREATE PROCEDURE proc_user_update(
        var_id INT(9),
        var_firstName varchar(50),
        var_lastName varchar(50),
        var_dateOfBirth date
    )
    BEGIN
        UPDATE `tbl_profile` SET 
            `firstName` = var_firstName,
            `lastName` = var_lastName,
            `dateOfBirth` = var_dateOfBirth
        WHERE `fk_user`=var_id;
    END;
    //
    DELIMITER ;

    CALL proc_user_update(
        1,
        'newName',
        'NewLast',
        '1996/02/05'
    );
/* Actualizar usuario */

/* Crear categoria */
    DELIMITER //
    CREATE PROCEDURE proc_category_create(
        var_id INT(9),
        var_name varchar(50)
    )
    BEGIN
        INSERT INTO `tbl_category_list` SET 
            `name` = var_name,
            `fk_user` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_category_create(
        1, 
        'Hogar'
    );
    CALL proc_category_create(
        1, 
        'Escuela'
    );
/* Crear categoria */

/* Actualizar categoria */
    DELIMITER //
    CREATE PROCEDURE proc_category_update(
        var_id INT(9),
        var_name varchar(50)
    )
    BEGIN
        UPDATE `tbl_category_list` SET 
            `name` = var_name
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_category_update(
        1, 
        'Hogar corregido 2'
    );
/* Actualizar categoria */

/* Crear item */
    DELIMITER //
    CREATE PROCEDURE proc_item_create(
        var_id INT(9),
        var_title varchar(50),
        var_detail varchar(100)
    )
    BEGIN
        INSERT INTO `tbl_items` SET 
            `title` = var_title,
            `detail` = var_detail,
            `status` = 0,
            `fk_category_list` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_item_create(
        1, 
        'titulo',
        'Contenido'
    );
/* Crear item */

/* Actualizar item */
    DELIMITER //
    CREATE PROCEDURE proc_item_update(
        var_id INT(9),
        var_title varchar(50),
        var_detail varchar(100),
        var_status char(1)
    )
    BEGIN
        UPDATE `tbl_items` SET 
            `title` = var_title,
            `detail` = var_detail,
            `status` = var_status
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_item_update(
        1, 
        'titulo edit',
        'Contenido edit',
        1
    );
/* Actualizar item */

/* Eliminar item */
    DELIMITER //
    CREATE PROCEDURE proc_item_delete(
        var_id INT(9)
    )
    BEGIN
        DELETE FROM `tbl_items` 
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_item_delete(1);
/* Eliminar item */

/* Eliminar category */
    DELIMITER //
    CREATE PROCEDURE proc_category_delete(
        var_id INT(9)
    )
    BEGIN
        DELETE FROM `tbl_items` 
        WHERE `fk_category_list` = var_id;

        DELETE FROM `tbl_category_list`
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_category_delete(2);
/* Eliminar category */

/* Eliminar user */
    DELIMITER //
    CREATE PROCEDURE proc_user_delete(
        var_id INT(9)
    )
    BEGIN
        DELETE FROM `tbl_items` 
        WHERE `fk_category_list` IN (
            SELECT id FROM `tbl_category_list` WHERE `fk_user` = var_id
        );

        DELETE FROM `tbl_category_list`
        WHERE `fk_user` = var_id;

        DELETE FROM `tbl_profile`
        WHERE `fk_user` = var_id;

        DELETE FROM `tbl_user`
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_user_delete(1);
/* Eliminar user */

/* Seleccionar Item por id */
    DELIMITER //
    CREATE PROCEDURE proc_item_select_by_id(
        var_id INT(9)
    )
    BEGIN
        SELECT * FROM `tbl_items` 
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_item_select_by_id(1);
/* Seleccionar Item por id */

/* Seleccionar Item por Categoria */
    DELIMITER //
    CREATE PROCEDURE proc_item_select_by_category_id(
        var_id INT(9)
    )
    BEGIN
        SELECT * FROM `tbl_items` 
        WHERE `fk_category_list` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_item_select_by_category_id(1);
/* Seleccionar Item por Categoria */

/* Seleccionar Categoria por id */
    DELIMITER //
    CREATE PROCEDURE proc_category_select_by_id(
        var_id INT(9)
    )
    BEGIN
        SELECT * FROM `tbl_category_list`
        WHERE `id` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_category_select_by_id(1);
/* Seleccionar Categoria por id */

/* Seleccionar Categoria por usuario */
    DELIMITER //
    CREATE PROCEDURE proc_category_select_by_user_id(
        var_id INT(9)
    )
    BEGIN
        SELECT * FROM `tbl_category_list`
        WHERE `fk_user` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_category_select_by_user_id(1);
/* Seleccionar Categoria por usuario */

/* Seleccionar perfil usuario */
    DELIMITER //
    CREATE PROCEDURE proc_profile_by_id(
        var_id INT(9)
    )
    BEGIN
        SELECT * FROM `tbl_profile`
        WHERE `fk_user` = var_id;
    END;
    //
    DELIMITER ;

    CALL proc_profile_by_id(1);
/* Seleccionar perfil usuario */
