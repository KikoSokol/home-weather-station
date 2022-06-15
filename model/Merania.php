<?php


class Merania
{
    public string $id;
    public string $svietivost;
    public string $teplota;
    public string $vlhkost;
    public string $cas;

    /**
     * @return mixed
     */
    public function getSvietivost()
    {
        return $this->svietivost;
    }

    /**
     * @param mixed $svietivost
     */
    public function setSvietivost($svietivost)
    {
        $this->svietivost = $svietivost;
    }

    /**
     * @return mixed
     */
    public function getTeplota()
    {
        return $this->teplota;
    }

    /**
     * @param mixed $teplota
     */
    public function setTeplota($teplota)
    {
        $this->teplota = $teplota;
    }

    /**
     * @return mixed
     */
    public function getVlhkost()
    {
        return $this->vlhkost;
    }

    /**
     * @param mixed $vlhkost
     */
    public function setVlhkost($vlhkost)
    {
        $this->vlhkost = $vlhkost;
    }

    /**
     * @return mixed
     */
    public function getCas()
    {
        return $this->cas;
    }

    /**
     * @param mixed $cas
     */
    public function setCas($cas)
    {
        $this->cas = $cas;
    }


}