DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL, 
    PODER TEXT NOT NULL
)

-- Create
INSERT INTO TB_HEROIS (NOME, PODER) 
VALUES 
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com os animais'),
    ('Batman', 'Dinheiro'),

-- Read
SELECT * FROM TB_HEROIS
SELECT * FROM TB_HEROIS WHERE ID = 1
SELECT NOME FROM TB_HEROIS WHERE ID = 1

-- Update
UPDATE TB_HEROIS
SET NOME='Batminha', PODER='Stripper'
WHERE ID = 3


-- Delete

DELETE FROM TB_HEROIS WHERE ID = :ID